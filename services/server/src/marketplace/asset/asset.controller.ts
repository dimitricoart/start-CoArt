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
  Put,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

import { UserRole } from "@framework/types";
import { NotFoundInterceptor, PaginationInterceptor } from "../../common/interceptors";
import { Public, Roles, User } from "../../common/decorators";

import { UserEntity } from "../../infrastructure/user/user.entity";
import { AssetEntity } from "./asset.entity";
import { AssetService } from "./asset.service";
import {
  AssetCreateDto,
  AssetProposePriceDto,
  AssetSearchDto,
  AssetTokenizeDto,
  AssetUpdateDto,
  AssetValidateDto,
} from "./dto";

@Controller("/assets")
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get("/")
  @UseInterceptors(PaginationInterceptor)
  public search(@Query() dto: AssetSearchDto, @User() userEntity: UserEntity): Promise<[Array<AssetEntity>, number]> {
    return this.assetService.search(dto, userEntity);
  }

  @ApiBearerAuth()
  @Post("/")
  @Roles(UserRole.SUPER)
  public create(@Body() dto: AssetCreateDto, @User() userEntity: UserEntity): Promise<AssetEntity> {
    return this.assetService.create(dto, userEntity);
  }

  @Get("/new")
  @UseInterceptors(PaginationInterceptor)
  public new(): Promise<[Array<AssetEntity>, number]> {
    return this.assetService.new({});
  }

  // @Public()
  @Get("/sync")
  @Roles(UserRole.SUPER)
  public sync(): Promise<{ count: number }> {
    return this.assetService.sync();
  }

  @ApiBearerAuth()
  @Post("/:assetId/propose")
  @HttpCode(HttpStatus.NO_CONTENT)
  public propose(
    @Param("assetId", ParseUUIDPipe) assetId: string,
    @Body() dto: AssetProposePriceDto,
    @User() userEntity: UserEntity,
  ): Promise<void> {
    return this.assetService.propose({ id: assetId }, dto, userEntity);
  }

  @ApiBearerAuth()
  @Put("/:assetId/validate")
  @Roles(UserRole.SUPER, UserRole.ADMIN)
  public validate(
    @Param("assetId", ParseUUIDPipe) assetId: string,
    @Body() dto: AssetValidateDto,
  ): Promise<AssetEntity> {
    return this.assetService.validate({ id: assetId }, dto);
  }

  @ApiBearerAuth()
  @Post("/:assetId/tokenize")
  @HttpCode(HttpStatus.NO_CONTENT)
  public tokenize(
    @Param("assetId", ParseUUIDPipe) assetId: string,
    @Body() dto: AssetTokenizeDto,
    @User() userEntity: UserEntity,
  ): Promise<void> {
    return this.assetService.tokenize({ id: assetId }, dto, userEntity);
  }

  @Public()
  @Get("/:assetId")
  @UseInterceptors(NotFoundInterceptor)
  public findOne(
    @Param("assetId", ParseUUIDPipe) assetId: string,
    @User() userEntity?: UserEntity,
  ): Promise<AssetEntity | null> {
    return this.assetService.findOneAndCheckStatus({ id: assetId }, userEntity);
  }

  @ApiBearerAuth()
  @Put("/:assetId")
  public update(
    @Param("assetId", ParseUUIDPipe) assetId: string,
    @Body() dto: AssetUpdateDto,
    @User() userEntity: UserEntity,
  ): Promise<AssetEntity> {
    return this.assetService.update({ id: assetId }, dto, userEntity);
  }

  @ApiBearerAuth()
  @Delete("/:assetId")
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param("assetId", ParseUUIDPipe) assetId: string, @User() userEntity: UserEntity): Promise<void> {
    await this.assetService.delete({ id: assetId }, userEntity);
  }
}
