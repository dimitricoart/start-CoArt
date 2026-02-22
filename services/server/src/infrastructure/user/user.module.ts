import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { GoogleModule } from "../../integrations/google/google.module";

import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserEntity } from "./user.entity";
import { UserCron } from "./user.cron";

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([UserEntity]), GoogleModule],
  providers: [Logger, UserService, UserCron],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
