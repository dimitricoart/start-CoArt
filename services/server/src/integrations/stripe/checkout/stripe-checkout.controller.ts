import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  RawBodyRequest,
  Req,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { Stripe } from "stripe";

import { Public, User } from "../../../common/decorators";

import { UserEntity } from "../../../infrastructure/user/user.entity";
import { AssetPurchaseDto } from "../../../marketplace/asset/dto";
import { STRIPE_PROVIDER } from "../stripe.provider";
import { StripeCheckoutService } from "./stripe-checkout.service";
import type { IStripeCheckoutWebhookResult } from "./interfaces";

@Controller("/stripe-checkout")
export class StripeCheckoutController {
  constructor(
    private readonly stripeService: StripeCheckoutService,
    private readonly configService: ConfigService,
    @Inject(STRIPE_PROVIDER)
    private readonly stripeClient: Stripe,
  ) {}

  @Public()
  @Post("/webhook")
  public async webhook(@Req() req: RawBodyRequest<Request>): Promise<IStripeCheckoutWebhookResult> {
    const sig = req.headers["stripe-signature"]!;
    const webhookSecret = this.configService.get<string>("STRIPE_WEBHOOK_SECRET", "");

    let event;

    try {
      event = this.stripeClient.webhooks.constructEvent(req.rawBody!, sig, webhookSecret);
    } catch (error) {
      void error;
      throw new BadRequestException("Signature does not match");
    }

    await this.stripeService.webhook(event);

    return { success: true };
  }

  @Post("/sell/:assetId")
  public sell(
    @Param("assetId", ParseUUIDPipe) assetId: string,
    @Body() dto: AssetPurchaseDto,
    @User() userEntity: UserEntity,
  ): Promise<void> {
    return this.stripeService.sell(assetId, dto, userEntity);
  }
}
