import { Logger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './module/user/user.module';
import { I18nextModule } from './core/i18next/i18next.module';
import { I18nextInterceptor } from './core/i18next/i18next.interceptor';
import { AuthModule } from './core/auth/auth.module';
import { ResponseInterceptor } from './core/interceptor/response.interceptor';
import { typeOrmModule } from './core/database/typeOrm.module';

@Module({
    imports: [
        typeOrmModule(new Logger()),
        UserModule,
        AuthModule,
        I18nextModule,
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: I18nextInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
    ],
})
export class AppModule {}
