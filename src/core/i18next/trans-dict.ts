/* eslint-disable @typescript-eslint/ban-types */
import { TranslateDict } from 'shared/i18next.service';
import TRANS_JSON = require('src/locales/vi_VN/translation.json');

export type TRANS = typeof TRANS_JSON;

export class TransDict implements TranslateDict<TRANS> {
    public SORRY_SOMETHING_WENT_WRONG!: {
        params: {};
    };

    public SUCCESS!: {
        params: {};
    };

    public BAD_REQUEST!: {
        params: {};
    };

    public UNAUTHORIZED!: {
        params: {};
    };

    public FORBIDDEN!: {
        params: {};
    };

    public DATA_NOT_FOUND!: {
        params: {};
    };

    public USERNAME_OR_PASSWORD_INVALID!: {
        params: {};
    };

    public USER_NOT_FOUND!: {
        params: {};
    };
}
