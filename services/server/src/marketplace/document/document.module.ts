import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { GoogleModule } from "../../integrations/google/google.module";

import { DocumentService } from "./document.service";
import { DocumentController } from "./document.controller";
import { DocumentEntity } from "./document.entity";
import { DocumentCron } from "./document.cron";

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([DocumentEntity]), GoogleModule],
  providers: [Logger, DocumentService, DocumentCron],
  controllers: [DocumentController],
  exports: [DocumentService],
})
export class DocumentModule {}
