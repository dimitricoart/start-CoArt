import { Body, Controller, Get, Post, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

import { NotFoundInterceptor } from "../../common/interceptors";
import { User } from "../../common/decorators";

import { UserEntity } from "../../infrastructure/user/user.entity";
import { WalletEntity } from "./wallet.entity";
import { WalletService } from "./wallet.service";
import { WalletCreateDto } from "./dto";

@ApiBearerAuth()
@Controller("/wallet")
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get("/")
  @UseInterceptors(NotFoundInterceptor)
  public search(@User() userEntity: UserEntity): Promise<WalletEntity | null> {
    return this.walletService.findOne({ merchant: userEntity.merchant });
  }

  @Post("/")
  public create(@Body() _dto: WalletCreateDto, @User() userEntity: UserEntity): Promise<WalletEntity> {
    return this.walletService.create(userEntity.merchant);
  }
}
