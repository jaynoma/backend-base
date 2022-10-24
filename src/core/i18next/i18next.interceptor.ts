import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    NestInterceptor,
    Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import {
    LANGUAGE,
    LanguageCodeMap,
    LANGUAGE_CODE,
} from 'shared/business/language';
import { TranslateDict } from 'shared/i18next.service';
import { BaseI18nextService } from './i18next.service';
import * as i18next from 'i18next';

interface ITranslatedRequest {
    t: BaseI18nextService<unknown, TranslateDict<unknown>>['t'];
    language: LANGUAGE;
}

@Injectable()
export class I18nextInterceptor implements NestInterceptor {
    private getLangHeader(header: string): LANGUAGE_CODE {
        const res = header.replace(/-/g, '_') as LANGUAGE_CODE;
        if (!header || !Object.values(LANGUAGE_CODE).includes(res)) {
            return LANGUAGE_CODE.VIETNAMESE;
        }
        return res;
    }

    public intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> {
        try {
            const request: Request & ITranslatedRequest = context
                .switchToHttp()
                .getRequest();
            const languageCode = this.getLangHeader(
                request.acceptsLanguages()[0],
            );
            request.language = LanguageCodeMap[languageCode];
            request.t = i18next.getFixedT(languageCode);
            return next.handle();
        } catch (e) {
            console.log('ERROR I18nextInterceptor', e.message, e.trace);
            throw new BadRequestException(e.message);
        }
    }
}
