import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { SafeWalletModule } from "../../integrations/safe-wallet/safe-wallet.module";
import { PrivateKeyModule } from "../private-key/private-key.module";
import { WalletService } from "./wallet.service";
import { WalletEntity } from "./wallet.entity";
import { WalletController } from "./wallet.controller";

@Module({
  imports: [ConfigModule, SafeWalletModule, PrivateKeyModule, MikroOrmModule.forFeature([WalletEntity])],
  providers: [WalletService],
  controllers: [WalletController],
  exports: [WalletService],
})
export class WalletModule {}
