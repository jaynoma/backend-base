import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EnvironmentModule } from 'src/module/environment/environment.module';
import { EnvironmentService } from 'src/module/environment/environment.service';
import { UserModule } from 'src/module/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [EnvironmentModule],
            useFactory: async (
                env: EnvironmentService,
            ): Promise<JwtModuleOptions> => {
                return {
                    secret: env.ENVIRONMENT.JWT_SECRET,
                };
            },
            inject: [EnvironmentService],
        }),
        EnvironmentModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, PassportModule],
})
export class AuthModule {}
