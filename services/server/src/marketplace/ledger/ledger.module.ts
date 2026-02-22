import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { ShowroomModule } from "../showroom/showroom.module";
import { LedgerService } from "./ledger.service";
import { LedgerEntity } from "./ledger.entity";
import { LedgerController } from "./ledger.controller";

@Module({
  imports: [ShowroomModule, MikroOrmModule.forFeature([LedgerEntity])],
  providers: [LedgerService],
  controllers: [LedgerController],
  exports: [LedgerService],
})
export class LedgerModule {}
