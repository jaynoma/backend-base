export enum LANGUAGE {
    ENGLISH = 2,
    VIETNAMESE = 3,
}

export enum LANGUAGE_CODE {
    VIETNAMESE = 'vi_VN',
    ENGLISH = 'en_US',
}

type LanguageCodeMapper = {
    [key in LANGUAGE_CODE]: LANGUAGE;
};

export const LanguageCodeMap: LanguageCodeMapper = {
    [LANGUAGE_CODE.VIETNAMESE]: LANGUAGE.VIETNAMESE,
    [LANGUAGE_CODE.ENGLISH]: LANGUAGE.ENGLISH,
};
