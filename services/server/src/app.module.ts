import { APP_FILTER, APP_GUARD, APP_PIPE } from "@nestjs/core";
import { Logger, Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
// eslint-disable-next-line import/no-unresolved
import { SentryModule } from "@sentry/nestjs/setup";
import { ScheduleModule } from "@nestjs/schedule";

import { FirebaseAuthGuard, RolesGuard } from "./common/guards";
import { HttpExceptionFilter } from "./common/filters/http";
import { ValidationExceptionFilter } from "./common/filters/validation-exception.filter";

import { AppController } from "./app.controller";
import { InfrastructureModule } from "./infrastructure/infrastructure.module";
import { MarketplaceModule } from "./marketplace/marketplace.module";
import { BlockchainModule } from "./blockchain/blockchain.module";
import { IntegrationsModule } from "./integrations/integrations.module";

@Module({
  providers: [
    Logger,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: false,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: FirebaseAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    SentryModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    ScheduleModule.forRoot(),
    InfrastructureModule,
    MarketplaceModule,
    BlockchainModule,
    IntegrationsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
