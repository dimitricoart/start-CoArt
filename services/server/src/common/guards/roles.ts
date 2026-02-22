import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

import { UserRole } from "@framework/types";

import { UserEntity } from "../../infrastructure/user/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Array<UserRole>>("roles", [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const userEntity = request.user as UserEntity;

    const hasRole = userEntity.userRoles.some((role: UserRole) => !!roles.find(item => item === role));

    if (hasRole) {
      return true;
    }

    throw new UnauthorizedException("userHasWrongRole");
  }
}
