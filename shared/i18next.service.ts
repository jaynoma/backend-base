import * as i18next from 'i18next';

export type TranslateDict<T> = {
    [k in keyof T]: {
        params: {
            [key: string]: unknown;
        };
    };
};

export abstract class AbstractI18nextService<
    SupportedLang,
    K,
    Dict extends TranslateDict<K>,
> {
    public abstract supportedLang: SupportedLang[];

    protected abstract _t: i18next.TFunction;

    public t<D extends keyof K>(
        key: D | D[],
        params: Dict[D]['params'],
        options?: i18next.TOptions,
    ): ReturnType<i18next.TFunction> {
        return this._t(key as any, {
            ...params,
            options,
        });
    }
}
