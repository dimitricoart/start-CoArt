import { Module } from "@nestjs/common";

import { ContractModule } from "./contract/contract.module";
import { TokenModule } from "./token/token.module";
import { BalanceModule } from "./balance/balance.module";

@Module({
  imports: [ContractModule, TokenModule, BalanceModule],
})
export class HierarchyModule {}
