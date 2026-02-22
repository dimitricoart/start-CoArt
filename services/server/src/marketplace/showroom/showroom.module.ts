import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { GoogleModule } from "../../integrations/google/google.module";

import { ShowroomService } from "./showroom.service";
import { ShowroomController } from "./showroom.controller";
import { ShowroomEntity } from "./showroom.entity";
import { ShowroomCron } from "./showroom.cron";

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([ShowroomEntity]), GoogleModule],
  providers: [Logger, ShowroomService, ShowroomCron],
  controllers: [ShowroomController],
  exports: [ShowroomService],
})
export class ShowroomModule {}
