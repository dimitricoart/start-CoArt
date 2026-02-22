import { Controller, Get, UseInterceptors } from "@nestjs/common";

import { PaginationInterceptor } from "../../common/interceptors";
import { Roles } from "../../common/decorators";
import { UserRole } from "@framework/types";

import { PhotoEntity } from "./photo.entity";
import { PhotoService } from "./photo.service";

@Controller("/photos")
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get("/")
  @Roles(UserRole.SUPER, UserRole.ADMIN)
  @UseInterceptors(PaginationInterceptor)
  public search(): Promise<[Array<PhotoEntity>, number]> {
    return this.photoService.findAndCount({});
  }
}
