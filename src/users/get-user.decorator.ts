import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Users } from "./Schema/user.schema";

export const getUser = createParamDecorator((data, ctx: ExecutionContext): Users => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
})