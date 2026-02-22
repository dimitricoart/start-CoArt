import { Logger, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import admin from "firebase-admin";

import { PassportModule } from "@nestjs/passport";

import { ShowroomModule } from "../../marketplace/showroom/showroom.module";
import { MerchantModule } from "../merchant/merchant.module";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";
import { FirebaseStrategy } from "./strategies";
import { APP_PROVIDER } from "./auth.constants";

@Module({
  imports: [ConfigModule, UserModule, MerchantModule, ShowroomModule, PassportModule],
  providers: [
    Logger,
    AuthService,
    FirebaseStrategy,
    {
      provide: APP_PROVIDER,
      useValue: admin,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {
  constructor(private readonly configService: ConfigService) {}

  public configure(): void {
    const projectId = this.configService.get<string>("FIREBASE_PROJECT_ID");
    admin.initializeApp({
      projectId,
    });
  }
}
