import {
    CallHandler,
    ExecutionContext,
    HttpException,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResponseDTO } from 'shared/dto/base.dto';
import { SYSTEM_CODE } from 'shared/dto/system-code';
import { TranslateDict } from 'shared/i18next.service';
import { BaseI18nextService, I18nextService } from '../i18next/i18next.service';

export type SystemCodeTrans<
    CODE extends SYSTEM_CODE,
    T extends BaseI18nextService<unknown, TranslateDict<unknown>>,
> = {
    [k in CODE]: (t: T['t']) => string;
};

@Injectable()
export class ResponseInterceptor<T>
    implements NestInterceptor<T, ResponseDTO<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<ResponseDTO<any>> {
        const req = context.switchToHttp().getRequest();
        const res: Response = context.switchToHttp().getResponse();

        return next.handle().pipe(
            map((response) => {
                return this.translateResponse(
                    req.t,
                    SYSTEM_CODE.SUCCESS,
                    response,
                );
            }),
            catchError((error: HttpException | Error) => {
                let httpCode = 500;
                const validationMessage =
                    ResponseInterceptor.getValidationMessage(error);
                if (error instanceof HttpException) {
                    httpCode =
                        error && error.getStatus ? error.getStatus() : httpCode;
                    res.status(httpCode);
                } else {
                    httpCode = res.statusCode;
                }

                let systemCode =
                    error.message || SYSTEM_CODE.SORRY_SOMETHING_WENT_WRONG;
                if (httpCode === 401) {
                    systemCode = SYSTEM_CODE.UNAUTHORIZED;
                } else if (httpCode === 403) {
                    systemCode = SYSTEM_CODE.FORBIDDEN;
                }
                return of(
                    this.translateResponse(
                        req.t,
                        systemCode,
                        undefined,
                        validationMessage,
                    ),
                );
            }),
        );
    }

    protected translateResponse(
        t: BaseI18nextService<unknown, TranslateDict<unknown>>['t'],
        systemCode: string,
        data?: unknown,
        validationMessage?: string,
    ): ResponseDTO<unknown> {
        const response: ResponseDTO<unknown> = {
            systemCode,
            message:
                validationMessage || this.systemCodeTransMap()[systemCode](t),
            data,
        };
        return response;
    }

    private static getValidationMessage(err: any): any | undefined {
        try {
            const validationObj = err && err.response && err.response.message;
            if (Array.isArray(validationObj) && validationObj.length > 0) {
                return validationObj;
            }
            return undefined;
        } catch (e) {
            return undefined;
        }
    }

    protected systemCodeTransMap(): SystemCodeTrans<
        SYSTEM_CODE,
        I18nextService
    > {
        return {
            SUCCESS: (t: I18nextService['t']) => t('SUCCESS', {}) + '',
            SORRY_SOMETHING_WENT_WRONG: (t: I18nextService['t']) =>
                t('SORRY_SOMETHING_WENT_WRONG', {}) + '',
            BAD_REQUEST: (t: I18nextService['t']) => t('BAD_REQUEST', {}) + '',
            UNAUTHORIZED: (t: I18nextService['t']) =>
                t('UNAUTHORIZED', {}) + '',
            FORBIDDEN: (t: I18nextService['t']) => t('FORBIDDEN', {}) + '',
            DATA_NOT_FOUND: (t: I18nextService['t']) =>
                t('DATA_NOT_FOUND', {}) + '',
            USER_NOT_FOUND: (t: I18nextService['t']) =>
                t('USER_NOT_FOUND', {}) + '',
            USERNAME_OR_PASSWORD_INVALID: (t: I18nextService['t']) =>
                t('USERNAME_OR_PASSWORD_INVALID', {}) + '',
        };
    }
}
