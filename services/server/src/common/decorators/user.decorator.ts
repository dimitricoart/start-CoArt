import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { UserEntity } from "../../infrastructure/user/user.entity";

export const User = createParamDecorator((_data: unknown, ctx: ExecutionContext): UserEntity => {
  const request = ctx.switchToHttp().getRequest<{ user: UserEntity }>();
  return request.user;
});
