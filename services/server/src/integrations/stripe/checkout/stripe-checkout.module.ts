import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { EmailModule } from "../../../infrastructure/email/email.module";
import { ProvenanceModule } from "../../../marketplace/provenance/provenance.module";
import { OfferModule } from "../../../marketplace/offer/offer.module";
import { PdfModule } from "../../../marketplace/pdf/pdf.module";
import { LedgerModule } from "../../../marketplace/ledger/ledger.module";
import { SafeWalletModule } from "../../safe-wallet/safe-wallet.module";
import { stripeProvider } from "../stripe.provider";
import { StripeCheckoutService } from "./stripe-checkout.service";
import { StripeCheckoutController } from "./stripe-checkout.controller";
import { StripeCheckoutEntity } from "./stripe-checkout.entity";

@Module({
  imports: [
    ConfigModule,
    SafeWalletModule,
    OfferModule,
    ProvenanceModule,
    PdfModule,
    EmailModule,
    LedgerModule,
    MikroOrmModule.forFeature([StripeCheckoutEntity]),
  ],
  providers: [stripeProvider, Logger, StripeCheckoutService],
  controllers: [StripeCheckoutController],
  exports: [StripeCheckoutService],
})
export class StripeCheckoutModule {}
