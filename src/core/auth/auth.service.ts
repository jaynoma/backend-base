import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../database/entity/user.entity';
import { LoginBodyDTO, LoginResponseDTO } from 'shared/dto/login.dto';
import { UserService } from 'src/module/user/user.service';
import { JWTPayload } from './auth.payload';
import { comparePassword } from 'shared/utils/password';
import { SYSTEM_CODE } from 'shared/dto/system-code';
import { EnvironmentService } from 'src/module/environment/environment.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private readonly environmentService: EnvironmentService,
    ) {}

    public async validateUser(
        username: string,
        password: string,
    ): Promise<UserEntity> {
        const user = await this.userService.findByUsername(username);
        if (!user) throw new BadRequestException(SYSTEM_CODE.USER_NOT_FOUND);
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            throw new BadRequestException(
                SYSTEM_CODE.USERNAME_OR_PASSWORD_INVALID,
            );
        }

        return user;
    }

    public async login(body: LoginBodyDTO): Promise<LoginResponseDTO> {
        const user = await this.validateUser(body.user_name, body.password);
        const payload: JWTPayload = {
            user_name: user.user_name,
            user_id: user.id,
        };

        return {
            access_token: this.jwtService.sign(payload, {
                expiresIn: this.environmentService.ENVIRONMENT.TOKEN_EXPIRE,
            }),
            expires_in: this.environmentService.ENVIRONMENT.TOKEN_EXPIRE,
        };
    }

    public async validateToken(payload: JWTPayload): Promise<UserEntity> {
        const user = this.userService.getProfile(payload.user_id);
        if (!user) {
            throw new UnauthorizedException('Invalid Token');
        }
        return user as unknown as UserEntity;
    }
}
