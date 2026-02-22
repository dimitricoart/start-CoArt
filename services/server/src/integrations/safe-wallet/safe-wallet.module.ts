import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { chainProvider } from "../../blockchain/signer/chain.provider";
import { PrivateKeyModule } from "../../blockchain/private-key/private-key.module";
import { SafeWalletService } from "./safe-wallet.service";

@Module({
  imports: [ConfigModule, PrivateKeyModule],
  providers: [chainProvider, Logger, SafeWalletService],
  exports: [SafeWalletService],
})
export class SafeWalletModule {}
