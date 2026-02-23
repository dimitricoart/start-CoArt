import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { AuthModule } from "./auth/auth.module";
import { EmailModule } from "./email/email.module";
import { HealthModule } from "./health/health.module";
import { MerchantModule } from "./merchant/merchant.module";
import { ProfileModule } from "./profile/profile.module";
import { OtpModule } from "./otp/otp.module";
import { UserModule } from "./user/user.module";
import { TestModule } from "./test/test.module";
import { ValidationModule } from "./validation/validation.module";
import config from "./database/database.config";

function parsePostgresUrl(url: string): { host: string; port: number; user: string; password: string; dbName: string } {
  const u = new URL(url);
  // Cloud SQL socket URLs use path as host, e.g. postgresql://user:pass@/cloudsql/PROJECT:REGION:INSTANCE/db
  // URL parser gives hostname like "%2Fcloudsql%2F..." — decode so pg uses it as socket path
  const host = decodeURIComponent(u.hostname || "");
  return {
    host: host || "localhost",
    port: u.port ? parseInt(u.port, 10) : 5432,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    dbName: u.pathname.replace(/^\//, "").split("/").filter(Boolean).pop() || "coart-development",
  };
}

@Module({
  imports: [
    AuthModule,
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const url = configService.get<string>("POSTGRES_URL");
        const fromUrl = url ? parsePostgresUrl(url) : null;
        return {
          ...config,
          host: fromUrl?.host ?? configService.get<string>("POSTGRES_HOST", "localhost"),
          port: fromUrl?.port ?? configService.get<number>("POSTGRES_PORT", 5432),
          user: fromUrl?.user ?? configService.get<string>("POSTGRES_USER", "postgres"),
          password: fromUrl?.password ?? configService.get<string>("POSTGRES_PASSWORD", ""),
          dbName: fromUrl?.dbName ?? configService.get<string>("POSTGRES_DB", "coart-development"),
        };
      },
    }),
    EmailModule,
    HealthModule,
    MerchantModule,
    ProfileModule,
    OtpModule,
    UserModule,
    ValidationModule,

    TestModule,
  ],
})
export class InfrastructureModule {}
