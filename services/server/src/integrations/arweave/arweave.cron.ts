import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { TurboAuthenticatedClient } from "@ardrive/turbo-sdk";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ConfigService } from "@nestjs/config";

import { NodeEnv } from "@framework/constants";

import { ARWEAVE_PROVIDER } from "./arweave.provider";
import { EmailType } from "../../infrastructure/email/interfaces";
import { EmailService } from "../../infrastructure/email/email.service";

@Injectable()
export class ArweaveCron {
  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(ARWEAVE_PROVIDER)
    private readonly turbo: TurboAuthenticatedClient,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  public async arweave() {
    const nodeEnv = this.configService.get<NodeEnv>("NODE_ENV", NodeEnv.development);

    if (nodeEnv !== NodeEnv.production) {
      return;
    }

    const balance = await this.turbo.getBalance();

    const threshold = 1e12; // 1 AR

    if (BigInt(balance.winc) > threshold) {
      return;
    }

    this.loggerService.log(`Balance is critically low: ${balance.winc}`, ArweaveCron.name);

    await this.emailService.sendEmail(EmailType.LOW_BALANCE, {
      chain: "Arweave",
      address: await this.turbo.signer.getNativeAddress(),
    });
  }
}
