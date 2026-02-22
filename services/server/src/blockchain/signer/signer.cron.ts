import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Chain, createPublicClient, formatEther, Hash, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";

import { NodeEnv } from "@framework/constants";

import { EmailService } from "../../infrastructure/email/email.service";
import { EmailType } from "../../infrastructure/email/interfaces";
import { CHAIN_PROVIDER } from "./chain.provider";

@Injectable()
export class SignerCron {
  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(CHAIN_PROVIDER)
    private readonly chain: Chain,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  public async polygon() {
    const nodeEnv = this.configService.get<NodeEnv>("NODE_ENV", NodeEnv.development);

    if (nodeEnv !== NodeEnv.production) {
      return;
    }

    const adminPrivateKey = this.configService.get<Hash>("PRIVATE_KEY_1");
    if (!adminPrivateKey) {
      return;
    }

    const publicClient = createPublicClient({
      chain: this.chain,
      transport: http(),
    });

    const account = privateKeyToAccount(adminPrivateKey);

    const balance = await publicClient.getBalance({
      address: account.address,
    });

    const threshold = 1e18; // 1 ETH

    if (balance > threshold) {
      return;
    }

    this.loggerService.log(`Balance is critically low: ${formatEther(balance)}`, SignerCron.name);

    await this.emailService.sendEmail(EmailType.LOW_BALANCE, {
      chain: "Polygon",
      address: account.address,
    });
  }
}
