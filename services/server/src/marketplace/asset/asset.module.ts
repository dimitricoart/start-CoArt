import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { GoogleModule } from "../../integrations/google/google.module";

import { ArweaveModule } from "../../integrations/arweave/arweave.module";
import { EmailModule } from "../../infrastructure/email/email.module";
import { TypesenseModule } from "../../integrations/typesense/typesense.module";
import { TokenModule } from "../../blockchain/hierarchy/token/token.module";
import { WalletModule } from "../../blockchain/wallet/wallet.module";
import { LedgerModule } from "../ledger/ledger.module";
import { PhotoModule } from "../photo/photo.module";
import { DocumentModule } from "../document/document.module";
import { PdfModule } from "../pdf/pdf.module";
import { ShowroomModule } from "../showroom/showroom.module";
import { AssetService } from "./asset.service";
import { AssetController } from "./asset.controller";
import { AssetEntity } from "./asset.entity";
import { AssetCron } from "./asset.cron";

@Module({
  imports: [
    ConfigModule,
    LedgerModule,
    PhotoModule,
    DocumentModule,
    WalletModule,
    EmailModule,
    TokenModule,
    TypesenseModule,
    PdfModule,
    ArweaveModule,
    ShowroomModule,
    MikroOrmModule.forFeature([AssetEntity]),
    GoogleModule,
  ],
  providers: [Logger, AssetService, AssetCron],
  controllers: [AssetController],
  exports: [AssetService],
})
export class AssetModule {}
