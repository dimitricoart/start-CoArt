import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { ContractEntity } from "./contract.entity";
import { ContractService } from "./contract.service";

@Module({
  imports: [MikroOrmModule.forFeature([ContractEntity])],
  providers: [ContractService],
  exports: [ContractService],
})
export class ContractModule {}
