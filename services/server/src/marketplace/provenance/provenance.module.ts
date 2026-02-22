import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { ProvenanceService } from "./provenance.service";
import { ProvenanceEntity } from "./provenance.entity";
import { ProvenanceController } from "./provenance.controller";

@Module({
  imports: [MikroOrmModule.forFeature([ProvenanceEntity])],
  providers: [ProvenanceService],
  controllers: [ProvenanceController],
  exports: [ProvenanceService],
})
export class ProvenanceModule {}
