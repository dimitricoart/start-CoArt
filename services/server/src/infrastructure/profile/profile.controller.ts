import { Controller, Get, HttpStatus, Res, Put, Body, Delete, HttpCode } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Response } from "express";

import { User } from "../../common/decorators";

import { UserEntity } from "../user/user.entity";
import { ProfileService } from "./profile.service";
import { ProfileUpdateDto } from "./dto";

@ApiBearerAuth()
@Controller("/profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get("/")
  public getProfile(@User() userEntity: UserEntity, @Res({ passthrough: true }) _res: Response): UserEntity {
    return userEntity;
  }

  @Put("/")
  public setProfile(@User() userEntity: UserEntity, @Body() dto: ProfileUpdateDto): Promise<UserEntity> {
    return this.profileService.update(userEntity, dto);
  }

  @Delete("/")
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteProfile(@User() userEntity: UserEntity): Promise<void> {
    await this.profileService.delete(userEntity);
  }
}
