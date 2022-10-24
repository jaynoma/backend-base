import { Global, Module } from '@nestjs/common';
import { I18nextInterceptor } from './i18next.interceptor';
import { I18nextService } from './i18next.service';

@Global()
@Module({
    providers: [
        {
            useFactory: async (): Promise<I18nextService> => {
                return I18nextService.init();
            },
            provide: I18nextService,
        },
        I18nextInterceptor,
    ],
    exports: [I18nextService],
})
export class I18nextModule {}
