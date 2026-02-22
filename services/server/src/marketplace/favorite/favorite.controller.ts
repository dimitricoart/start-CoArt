import {
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

import { PaginationInterceptor } from "../../common/interceptors";
import { User } from "../../common/decorators";
import { PaginationDto } from "../../common/dto";

import { UserEntity } from "../../infrastructure/user/user.entity";
import { FavoriteService } from "./favorite.service";
import { FavoriteEntity } from "./favorite.entity";

@ApiBearerAuth()
@Controller("/favorites")
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get("/")
  @UseInterceptors(PaginationInterceptor)
  public search(@Query() dto: PaginationDto, @User() userEntity: UserEntity): Promise<[Array<FavoriteEntity>, number]> {
    return this.favoriteService.search(dto, userEntity);
  }

  @Post("/:assetId")
  public create(
    @Param("assetId", ParseUUIDPipe) assetId: string,
    @User() userEntity: UserEntity,
  ): Promise<FavoriteEntity> {
    return this.favoriteService.create(assetId, userEntity);
  }

  @Delete("/:assetId")
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param("assetId", ParseUUIDPipe) assetId: string, @User() userEntity: UserEntity): Promise<void> {
    await this.favoriteService.delete(assetId, userEntity);
  }
}
