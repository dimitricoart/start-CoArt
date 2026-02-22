import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { AssetModule } from "../asset/asset.module";
import { OfferService } from "./offer.service";
import { OfferEntity } from "./offer.entity";
import { OfferController } from "./offer.controller";
import { LedgerModule } from "../ledger/ledger.module";

@Module({
  imports: [AssetModule, LedgerModule, MikroOrmModule.forFeature([OfferEntity])],
  providers: [OfferService],
  controllers: [OfferController],
  exports: [OfferService],
})
export class OfferModule {}
