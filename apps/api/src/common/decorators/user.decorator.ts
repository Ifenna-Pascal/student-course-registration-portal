import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();
    console.log(user, "user")
    return user;
  }
);
