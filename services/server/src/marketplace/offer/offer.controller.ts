import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

import { NotFoundInterceptor, PaginationInterceptor } from "../../common/interceptors";
import { User } from "../../common/decorators";
import { PaginationDto } from "../../common/dto";

import { UserEntity } from "../../infrastructure/user/user.entity";
import { OfferService } from "./offer.service";
import { OfferEntity } from "./offer.entity";
import { OfferCreateDto } from "./dto";

@ApiBearerAuth()
@Controller("/offers")
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Get("/")
  @UseInterceptors(PaginationInterceptor)
  public search(@Query() dto: PaginationDto, @User() userEntity: UserEntity): Promise<[Array<OfferEntity>, number]> {
    return this.offerService.search(dto, userEntity);
  }

  @Get("/:offerId")
  @UseInterceptors(NotFoundInterceptor)
  public findOne(@Param("offerId", ParseUUIDPipe) offerId: string): Promise<OfferEntity | null> {
    return this.offerService.findOneAndCheckExistence({ id: offerId });
  }

  @Post("/")
  public create(@Body() dto: OfferCreateDto, @User() userEntity: UserEntity): Promise<OfferEntity> {
    return this.offerService.create(dto, userEntity);
  }

  @Delete("/:offerId")
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param("offerId", ParseUUIDPipe) offerId: string, @User() userEntity: UserEntity): Promise<void> {
    await this.offerService.delete(offerId, userEntity);
  }
}
