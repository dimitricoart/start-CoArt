import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { GoogleModule } from "../google/google.module";

import { EmailModule } from "../../infrastructure/email/email.module";
import { ArweaveService } from "./arweave.service";
import { arweaveProvider } from "./arweave.provider";
import { ArweaveCron } from "./arweave.cron";

@Module({
  imports: [ConfigModule, EmailModule, GoogleModule],
  providers: [arweaveProvider, Logger, ArweaveService, ArweaveCron],
  exports: [ArweaveService],
})
export class ArweaveModule {}
