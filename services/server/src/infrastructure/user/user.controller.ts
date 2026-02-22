import { Controller, Get, UseInterceptors } from "@nestjs/common";

import { PaginationInterceptor } from "../../common/interceptors";
import { Roles } from "../../common/decorators";
import { UserRole } from "@framework/types";

import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/")
  @Roles(UserRole.SUPER, UserRole.ADMIN)
  @UseInterceptors(PaginationInterceptor)
  public findAll(): Promise<[Array<UserEntity>, number]> {
    return this.userService.findAndCount();
  }
}
