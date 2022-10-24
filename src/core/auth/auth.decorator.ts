import {
    createParamDecorator,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { JWTPayload } from './auth.payload';

interface IRequest<T extends JWTPayload> {
    user: T & { [key: string]: unknown };
}

function extractToken<T extends JWTPayload>(token: T): T | never {
    if (!token) {
        throw new UnauthorizedException();
    }
    return token;
}

export const JWTContent = createParamDecorator(
    <T extends JWTPayload>(_data: string, ctx: ExecutionContext): T => {
        const req = ctx.switchToHttp().getRequest();
        return extractToken(req.user);
    },
);
