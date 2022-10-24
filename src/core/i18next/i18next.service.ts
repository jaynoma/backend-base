import { AbstractI18nextService, TranslateDict } from 'shared/i18next.service';
import * as i18next from 'i18next';
import { Injectable } from '@nestjs/common';
import { TRANS, TransDict } from './trans-dict';

export enum SupportedLang {
    VI_VN = 'vi_VN',
    EN_US = 'en_US',
}

const supportedLang = [SupportedLang.VI_VN, SupportedLang.EN_US];

export class BaseI18nextService<
    T,
    D extends TranslateDict<T>,
> extends AbstractI18nextService<SupportedLang, T, D> {
    public supportedLang: SupportedLang[] = Object.values(SupportedLang);

    protected _t: i18next.TFunction;

    protected static async getTranslation(lang: string): Promise<any> {
        const translation = await import(
            `../../locales/${lang}/translation.json`
        );
        return {
            ...translation,
        };
    }

    public static async init<T, D extends TranslateDict<T>>(): Promise<
        BaseI18nextService<T, D>
    > {
        const service = new BaseI18nextService();
        const rs = await Promise.all(
            supportedLang.map(async (lang) => {
                return {
                    [lang]: {
                        translation: await this.getTranslation(lang),
                    },
                };
            }),
        );

        const langResources = await rs.reduce(
            (acc: any, cur) => Object.assign(acc, cur),
            {},
        );
        service._t = await i18next.init({
            resources: langResources,
            lng: supportedLang[0],
            debug: false,
        });

        return service;
    }
}

@Injectable()
export class I18nextService extends BaseI18nextService<TRANS, TransDict> {}
