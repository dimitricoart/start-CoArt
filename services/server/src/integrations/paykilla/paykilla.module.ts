import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { EmailModule } from "../../infrastructure/email/email.module";
import { ProvenanceModule } from "../../marketplace/provenance/provenance.module";
import { PdfModule } from "../../marketplace/pdf/pdf.module";
import { LedgerModule } from "../../marketplace/ledger/ledger.module";
import { OfferModule } from "../../marketplace/offer/offer.module";
import { SafeWalletModule } from "../safe-wallet/safe-wallet.module";
import { PaykillaService } from "./paykilla.service";
import { PaykillaController } from "./paykilla.controller";
import { PaykillaEntity } from "./paykilla.entity";

@Module({
  imports: [
    ConfigModule,
    SafeWalletModule,
    OfferModule,
    ProvenanceModule,
    PdfModule,
    EmailModule,
    LedgerModule,
    MikroOrmModule.forFeature([PaykillaEntity]),
  ],
  providers: [Logger, PaykillaService],
  controllers: [PaykillaController],
  exports: [PaykillaService],
})
export class PaykillaModule {}
