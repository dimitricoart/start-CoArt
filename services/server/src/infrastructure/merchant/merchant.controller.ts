import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, Query, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

import { NotFoundInterceptor, PaginationInterceptor } from "../../common/interceptors";
import { Public, User } from "../../common/decorators";
import { PaginationDto } from "../../common/dto";

import { MerchantService } from "./merchant.service";
import { MerchantEntity } from "./merchant.entity";
import { MerchantCreateDto, MerchantUpdateDto } from "./dto";
import { UserEntity } from "../user/user.entity";

@Controller("/merchants")
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Public()
  @Get("/")
  @UseInterceptors(PaginationInterceptor)
  public search(@Query() dto: PaginationDto): Promise<[Array<MerchantEntity>, number]> {
    return this.merchantService.search(dto);
  }

  @Post("/")
  public create(@Body() dto: MerchantCreateDto, @User() userEntity: UserEntity): Promise<MerchantEntity> {
    return this.merchantService.create(dto, userEntity);
  }

  @ApiBearerAuth()
  @Put("/:merchantId")
  public update(
    @Param("merchantId", ParseUUIDPipe) merchantId: string,
    @Body() dto: MerchantUpdateDto,
    @User() userEntity: UserEntity,
  ): Promise<MerchantEntity> {
    return this.merchantService.update({ id: merchantId }, dto, userEntity);
  }

  @Public()
  @Get("/:merchantId")
  @UseInterceptors(NotFoundInterceptor)
  public findOne(@Param("merchantId", ParseUUIDPipe) merchantId: string): Promise<MerchantEntity | null> {
    return this.merchantService.findOne({ id: merchantId });
  }
}
