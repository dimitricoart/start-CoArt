import { Inject, Injectable, Logger, LoggerService, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { FilterQuery, FindOneOptions, Loaded } from "@mikro-orm/core";
// eslint-disable-next-line import/no-unresolved
import { v4 } from "uuid";

import { IAssetPurchaseDto, OfferStatus, PaykillaStatus } from "@framework/types";
import { logoWithTextUrl } from "@framework/constants";

import { UserEntity } from "../../infrastructure/user/user.entity";
import { EmailType } from "../../infrastructure/email/interfaces";
import { EmailService } from "../../infrastructure/email/email.service";
import { OfferEntity } from "../../marketplace/offer/offer.entity";
import { OfferService } from "../../marketplace/offer/offer.service";
import { MerchantEntity } from "../../infrastructure/merchant/merchant.entity";
import { ProvenanceService } from "../../marketplace/provenance/provenance.service";
import { PdfService } from "../../marketplace/pdf/pdf.service";
import { SafeWalletService } from "../safe-wallet/safe-wallet.service";
import { IPaykillaUpdateDto, PaykillaEventTypes } from "./interfaces";
import { PaykillaEntity } from "./paykilla.entity";
import { createSignature } from "./utils";
import { LedgerService } from "../../marketplace/ledger/ledger.service";

@Injectable()
export class PaykillaService {
  constructor(
    @InjectRepository(PaykillaEntity)
    private readonly paykillaEntityRepository: EntityRepository<PaykillaEntity>,
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    private readonly configService: ConfigService,
    private readonly safeWalletService: SafeWalletService,
    private readonly offerService: OfferService,
    private readonly pdfService: PdfService,
    private readonly provenanceService: ProvenanceService,
    private readonly emailService: EmailService,
    private readonly ledgerService: LedgerService,
  ) {}

  public findOne<Hint extends string = never>(
    where: FilterQuery<PaykillaEntity>,
    options?: FindOneOptions<PaykillaEntity, Hint>,
  ): Promise<Loaded<PaykillaEntity, Hint> | null> {
    return this.paykillaEntityRepository.findOne(where, options);
  }

  public async create(
    sellerEntity: MerchantEntity,
    buyerEntity: MerchantEntity,
    offerEntity: OfferEntity,
    name: string,
    price: number,
    fractions: bigint,
    externalId: string,
  ): Promise<PaykillaEntity> {
    const paykillaEntity = this.paykillaEntityRepository.create({
      seller: sellerEntity,
      buyer: buyerEntity,
      offer: offerEntity,
      name,
      price,
      fractions,
      externalId,
      paykillaStatus: PaykillaStatus.NEW,
    });

    await this.paykillaEntityRepository.getEntityManager().persist(paykillaEntity).flush();

    return paykillaEntity;
  }

  public async update(where: FilterQuery<PaykillaEntity>, dto: IPaykillaUpdateDto): Promise<PaykillaEntity> {
    const paykillaEntity = await this.paykillaEntityRepository.findOne(where);

    if (!paykillaEntity) {
      throw new NotFoundException("invoiceNotFound");
    }

    Object.assign(paykillaEntity, dto);
    await this.paykillaEntityRepository.getEntityManager().persist(paykillaEntity).flush();
    return paykillaEntity;
  }

  public async webhook(dto: Record<string, any>): Promise<void> {
    const { data, eventType } = dto;

    switch (eventType) {
      case PaykillaEventTypes.INVOICE_CREATE_INVOICE: {
        const paykillaEntity = await this.findOne({
          externalId: data.externalId,
          paykillaStatus: PaykillaStatus.CREATED,
        });

        if (!paykillaEntity) {
          throw new NotFoundException("invoiceNotFound");
        }

        await this.offerService.update({ id: paykillaEntity.offer!.id }, { offerStatus: OfferStatus.TXAWAIT });

        break;
      }
      case PaykillaEventTypes.INVOICE_EXPIRED: {
        const paykillaEntity = await this.update(
          { externalId: data.externalId },
          { paykillaStatus: PaykillaStatus.EXPIRED },
        );

        await this.offerService.update({ id: paykillaEntity.offer!.id }, { offerStatus: OfferStatus.AVAILABLE });

        break;
      }
      case PaykillaEventTypes.INVOICE_PAID: {
        const paykillaEntity = await this.findOne(
          { externalId: data.externalId },
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

        if (!paykillaEntity) {
          throw new NotFoundException("invoiceNotFound");
        }

        const tx = await this.safeWalletService.transfer(
          paykillaEntity.seller!,
          paykillaEntity.buyer!,
          paykillaEntity.offer!,
          paykillaEntity.fractions,
        );

        this.loggerService.log(`txHash: ${tx.hash}`);

        await this.offerService.update({ id: paykillaEntity.offer!.id }, { offerStatus: OfferStatus.PAID });

        await this.ledgerService.upsert(
          paykillaEntity.buyer!,
          paykillaEntity.offer!.asset!,
          paykillaEntity.offer!.fractions,
        );

        await this.update({ externalId: data.externalId }, { paykillaStatus: PaykillaStatus.PAID });

        const agreementUrl = await this.pdfService.generatePurchaseAgreement(paykillaEntity.offer!, {
          name: paykillaEntity.name,
          isConfirmed: true,
        });

        this.loggerService.log(`agreement url: ${agreementUrl}`);

        await this.provenanceService.create(
          paykillaEntity.seller!,
          paykillaEntity.buyer!,
          paykillaEntity.offer!.asset!,
          paykillaEntity.name,
          paykillaEntity.price,
          paykillaEntity.fractions,
          tx.hash,
          agreementUrl,
        );

        await this.emailService.sendEmail(EmailType.PURCHASE_AGREEMENT, {
          agreementUrl,
          seller: paykillaEntity.seller,
          buyer: paykillaEntity.buyer,
        });

        break;
      }
      default:
        // we do not care about other events
        this.loggerService.log(`Received event ${eventType}`, PaykillaService.name);
        break;
    }
  }

  public async sell(offerId: string, dto: IAssetPurchaseDto, userEntity: UserEntity): Promise<any> {
    const baseUrl = this.configService.get<string>("FE_URL", "http://localhost:3002");
    const account = this.configService.get<string>("PAYKILLA_ACCOUNT", "0x...");

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

    const paykillaEntity = await this.create(
      offerEntity.merchant!,
      userEntity.merchant,
      offerEntity,
      dto.name,
      offerEntity.price,
      offerEntity.fractions,
      v4(),
    );

    const data = {
      timestamp: Date.now(),
      account,
      payload: {
        description: offerEntity.asset!.title,
        fiatAmount: offerEntity.price,
        fiatCurrency: "EUR",
        cryptoCurrencies: [
          "USDT_TRX",
          "USDT_BSC",
          "USDT_TON",
          "USDT",
          "USDC",
          "TON",
          "BNB",
          "TRX",
          "DAI",
          "ETH",
          "BTC",
        ],
        idempotencyKey: v4(),
        externalId: paykillaEntity.externalId,
        returnUrl: `${baseUrl}/asset/${offerEntity.asset!.id}`,
        logoUrl: logoWithTextUrl,
      },
    };

    const privateKey = this.configService.get<string>("PAYKILLA_API_PRIVATE", "");
    const publicKey = this.configService.get<string>("PAYKILLA_API_PUBLIC", "");

    const signature = createSignature(JSON.stringify(data), privateKey);

    const response = await fetch("https://api.paykilla.com/api/v1/payment-widget/single-fiat/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Key: publicKey,
        Sign: signature,
      },
      body: JSON.stringify(data),
    });

    const widget = await response.json();

    return {
      url: `https://pay.paykilla.com/pay?widgetKey=${widget.idempotencyKey}`,
    };
  }
}
