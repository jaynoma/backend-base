export abstract class DTO {
    public abstract readonly url: string;
    public abstract readonly method: METHOD;
    public abstract readonly responseDTOClass: any;

    public abstract bodyDTO: any;
    public abstract queryDTO: any;
    public abstract paramDTO: any;
}

export enum METHOD {
    GET = 'get',
    POST = 'post',
    DELETE = 'delete',
    PATCH = 'patch',
}

export class ResponseDTO<T> {
    constructor(
        public data: T,
        public message: string,
        public systemCode: string,
        public debugError?: T,
    ) {}
}
