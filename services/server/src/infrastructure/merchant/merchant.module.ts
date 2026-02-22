import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { GoogleModule } from "../../integrations/google/google.module";

import { WalletModule } from "../../blockchain/wallet/wallet.module";
import { MerchantService } from "./merchant.service";
import { MerchantController } from "./merchant.controller";
import { MerchantEntity } from "./merchant.entity";
import { MerchantCron } from "./merchant.cron";

@Module({
  imports: [ConfigModule, WalletModule, MikroOrmModule.forFeature([MerchantEntity]), GoogleModule],
  providers: [Logger, MerchantService, MerchantCron],
  controllers: [MerchantController],
  exports: [MerchantService],
})
export class MerchantModule {}
