import { Logger, Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import admin from "firebase-admin";

import { ProfileController } from "./profile.controller";
import { UserEntity } from "../user/user.entity";
import { ProfileService } from "./profile.service";
import { APP_PROVIDER } from "../auth/auth.constants";

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  providers: [
    Logger,
    ProfileService,
    {
      provide: APP_PROVIDER,
      useValue: admin,
    },
  ],
  controllers: [ProfileController],
  exports: [ProfileService],
})
export class ProfileModule {}
