import { BadRequestException, Body, Controller, Param, ParseUUIDPipe, Post, RawBodyRequest, Req } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

import { Public, User } from "../../common/decorators";

import { UserEntity } from "../../infrastructure/user/user.entity";
import { AssetPurchaseDto } from "../../marketplace/asset/dto";
import { PaykillaService } from "./paykilla.service";
import { createSignature } from "./utils";
import type { IPaykillaWebhookResult } from "./interfaces";

@Controller("/paykilla")
export class PaykillaController {
  constructor(
    private readonly paykillaService: PaykillaService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Post("/webhook")
  public async webhook(
    @Req() req: RawBodyRequest<Request>,
    @Body() dto: Record<string, any>,
  ): Promise<IPaykillaWebhookResult> {
    // this is HMAC implementation
    const { sign, key } = req.headers;

    if (!sign || !key) {
      throw new BadRequestException("Missing required headers");
    }

    const publicKey = this.configService.get<string>("PAYKILLA_WEBHOOK_PUBLIC", "");

    if (key !== publicKey) {
      throw new BadRequestException("Public key does not match");
    }

    const text = req.rawBody!.toString("utf8");

    const privateKey = this.configService.get<string>("PAYKILLA_WEBHOOK_PRIVATE", "");

    const signature = createSignature(text, privateKey);

    if (signature !== sign) {
      throw new BadRequestException("Signature does not match");
    }

    await this.paykillaService.webhook(dto);

    return { success: true };
  }

  @Post("/sell/:offerId")
  public sell(
    @Param("offerId", ParseUUIDPipe) offerId: string,
    @Body() dto: AssetPurchaseDto,
    @User() userEntity: UserEntity,
  ): Promise<any> {
    return this.paykillaService.sell(offerId, dto, userEntity);
  }
}
