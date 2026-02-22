import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { EmailModule } from "../../infrastructure/email/email.module";
import { chainProvider } from "./chain.provider";
import { SignerService } from "./signer.service";
import { SignerCron } from "./signer.cron";

@Module({
  imports: [ConfigModule, EmailModule],
  providers: [chainProvider, Logger, SignerService, SignerCron],
  exports: [SignerService],
})
export class SignerModule {}
