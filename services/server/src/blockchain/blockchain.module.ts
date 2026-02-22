import { Module } from "@nestjs/common";

import { WalletModule } from "./wallet/wallet.module";
import { HierarchyModule } from "./hierarchy/hierarchy.module";

@Module({
  imports: [WalletModule, HierarchyModule],
})
export class BlockchainModule {}
