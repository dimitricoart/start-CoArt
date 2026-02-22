import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { GoogleModule } from "../../integrations/google/google.module";

import { PhotoService } from "./photo.service";
import { PhotoController } from "./photo.controller";
import { PhotoEntity } from "./photo.entity";
import { PhotoCron } from "./photo.cron";

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([PhotoEntity]), GoogleModule],
  providers: [Logger, PhotoService, PhotoCron],
  controllers: [PhotoController],
  exports: [PhotoService],
})
export class PhotoModule {}
