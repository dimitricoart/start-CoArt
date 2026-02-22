import { Inject, Injectable, Logger, LoggerService, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { FilterQuery, FindOneOptions, Loaded } from "@mikro-orm/core";
import { Stripe } from "stripe";

import { IAssetPurchaseDto, OfferStatus, StripeCheckoutStatus } from "@framework/types";

import { UserEntity } from "../../../infrastructure/user/user.entity";
import { EmailType } from "../../../infrastructure/email/interfaces";
import { EmailService } from "../../../infrastructure/email/email.service";
import { OfferEntity } from "../../../marketplace/offer/offer.entity";
import { OfferService } from "../../../marketplace/offer/offer.service";
import { MerchantEntity } from "../../../infrastructure/merchant/merchant.entity";
import { ProvenanceService } from "../../../marketplace/provenance/provenance.service";
import { PdfService } from "../../../marketplace/pdf/pdf.service";
import { SafeWalletService } from "../../safe-wallet/safe-wallet.service";
import { IStripeCheckoutUpdateDto, StripeEventTypes } from "./interfaces";
import { StripeCheckoutEntity } from "./stripe-checkout.entity";
import { STRIPE_PROVIDER } from "../stripe.provider";
import { LedgerService } from "../../../marketplace/ledger/ledger.service";

@Injectable()
export class StripeCheckoutService {
  constructor(
    @InjectRepository(StripeCheckoutEntity)
    private readonly stripeCheckoutEntityRepository: EntityRepository<StripeCheckoutEntity>,
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    private readonly configService: ConfigService,
    private readonly safeWalletService: SafeWalletService,
    private readonly offerService: OfferService,
    private readonly pdfService: PdfService,
    private readonly provenanceService: ProvenanceService,
    private readonly emailService: EmailService,
    private readonly ledgerService: LedgerService,
    @Inject(STRIPE_PROVIDER)
    private readonly stripeClient: Stripe,
  ) {}

  public findOne<Hint extends string = never>(
    where: FilterQuery<StripeCheckoutEntity>,
    options?: FindOneOptions<StripeCheckoutEntity, Hint>,
  ): Promise<Loaded<StripeCheckoutEntity, Hint> | null> {
    return this.stripeCheckoutEntityRepository.findOne(where, options);
  }

  public async create(
    sellerEntity: MerchantEntity,
    buyerEntity: MerchantEntity,
    offerEntity: OfferEntity,
    name: string,
    price: number,
    fractions: bigint,
    externalId: string,
  ): Promise<StripeCheckoutEntity> {
    const stripeCheckoutEntity = this.stripeCheckoutEntityRepository.create({
      seller: sellerEntity,
      buyer: buyerEntity,
      offer: offerEntity,
      name,
      price,
      fractions,
      externalId,
      stripeCheckoutStatus: StripeCheckoutStatus.CREATED,
    });

    await this.stripeCheckoutEntityRepository.getEntityManager().persist(stripeCheckoutEntity).flush();

    return stripeCheckoutEntity;
  }

  public async update(
    where: FilterQuery<StripeCheckoutEntity>,
    dto: IStripeCheckoutUpdateDto,
  ): Promise<StripeCheckoutEntity> {
    const stripeCheckoutEntity = await this.stripeCheckoutEntityRepository.findOne(where);

    if (!stripeCheckoutEntity) {
      throw new NotFoundException("invoiceNotFound");
    }

    Object.assign(stripeCheckoutEntity, dto);
    await this.stripeCheckoutEntityRepository.getEntityManager().persist(stripeCheckoutEntity).flush();
    return stripeCheckoutEntity;
  }

  public async webhook(dto: Record<string, any>): Promise<void> {
    const { type, data } = dto;
    const session = data.object;

    switch (type) {
      case StripeEventTypes.CHECKOUT_SESSION_EXPIRED: {
        const stripeCheckoutEntity = await this.update(
          { externalId: session.id },
          { stripeCheckoutStatus: StripeCheckoutStatus.EXPIRED },
        );

        await this.offerService.update({ id: stripeCheckoutEntity.offer!.id }, { offerStatus: OfferStatus.TXAWAIT });

        break;
      }
      case StripeEventTypes.CHECKOUT_SESSION_COMPLETED: {
        const stripeCheckoutEntity = await this.findOne(
          { externalId: session.id },
          {
            populate: [
              "seller",
              "seller.wallet",
              "buyer",
              "buyer.wallet",
              "offer",
              "offer.asset",
              "offer.asset.token",
              "offer.asset.token.contract",
            ],
          },
        );

        if (!stripeCheckoutEntity) {
          throw new NotFoundException("invoiceNotFound");
        }

        const tx = await this.safeWalletService.transfer(
          stripeCheckoutEntity.seller!,
          stripeCheckoutEntity.buyer!,
          stripeCheckoutEntity.offer!,
          stripeCheckoutEntity.fractions,
        );

        this.loggerService.log(`txHash: ${tx.hash}`);

        await this.offerService.update({ id: stripeCheckoutEntity.offer!.id }, { offerStatus: OfferStatus.PAID });

        await this.ledgerService.upsert(
          stripeCheckoutEntity.buyer!,
          stripeCheckoutEntity.offer!.asset!,
          stripeCheckoutEntity.offer!.fractions,
        );

        await this.update({ externalId: session.id }, { stripeCheckoutStatus: StripeCheckoutStatus.PAID });

        const agreementUrl = await this.pdfService.generatePurchaseAgreement(stripeCheckoutEntity.offer!, {
          name: stripeCheckoutEntity.name,
          isConfirmed: true,
        });

        this.loggerService.log(`agreement url: ${agreementUrl}`);

        await this.provenanceService.create(
          stripeCheckoutEntity.seller!,
          stripeCheckoutEntity.buyer!,
          stripeCheckoutEntity.offer!.asset!,
          stripeCheckoutEntity.name,
          stripeCheckoutEntity.price,
          stripeCheckoutEntity.fractions,
          tx.hash,
          agreementUrl,
        );

        await this.emailService.sendEmail(EmailType.PURCHASE_AGREEMENT, {
          agreementUrl,
          seller: stripeCheckoutEntity.seller,
          buyer: stripeCheckoutEntity.buyer,
        });

        break;
      }
      default:
        // we do not care about other events
        this.loggerService.log(`Received event ${type}`, StripeCheckoutService.name);
        break;
    }
  }

  public async sell(offerId: string, dto: IAssetPurchaseDto, userEntity: UserEntity): Promise<any> {
    const baseUrl = this.configService.get<string>("FE_URL", "http://localhost:3002");

    const offerEntity = await this.offerService.findOne({ id: offerId }, { populate: ["asset", "merchant"] });

    if (!offerEntity) {
      throw new NotFoundException("offerNotFound");
    }

    if (offerEntity.offerStatus !== OfferStatus.AVAILABLE) {
      throw new NotFoundException("offerNotAvailable");
    }

    if (!userEntity.merchant.wallet) {
      throw new NotFoundException("walletNotFound");
    }

    const session = await this.stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "EUR",
            product_data: {
              name: offerEntity.asset!.title,
            },
            unit_amount: offerEntity.price * 100, // stripe wants create in cents
          },
          quantity: 1,
        },
      ],
      // CHECKOUT_SESSION_ID will be replaced by stripe with cs_test_a1b2c3d4e5f6g7h8
      success_url: `${baseUrl}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/stripe/cancel`,
    });

    await this.create(
      offerEntity.merchant!,
      userEntity.merchant,
      offerEntity,
      dto.name,
      offerEntity.price,
      offerEntity.fractions,
      session.id,
    );

    return {
      url: session.url,
    };
  }
}
