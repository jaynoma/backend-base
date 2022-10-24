import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentService } from 'src/module/environment/environment.service';
import { UserEntity } from '../database/entity/user.entity';
import { JWTPayload } from './auth.payload';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        environment: EnvironmentService,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: environment.ENVIRONMENT.JWT_SECRET,
        });
    }

    public async validate(payload: JWTPayload): Promise<UserEntity> {
        return this.authService.validateToken(payload);
    }
}
