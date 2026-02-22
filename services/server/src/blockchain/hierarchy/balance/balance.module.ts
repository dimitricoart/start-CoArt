import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { BalanceService } from "./balance.service";
import { BalanceEntity } from "./balance.entity";

@Module({
  imports: [MikroOrmModule.forFeature([BalanceEntity])],
  providers: [BalanceService],
  exports: [BalanceService],
})
export class BalanceModule {}
