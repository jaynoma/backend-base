import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';
import { DTO, METHOD } from './base.dto';

export class LoginResponseDTO {
    @IsString()
    @IsNotEmpty()
    public access_token!: string;

    @IsNumber()
    @IsOptional()
    public expires_in?: number;
}

export class LoginBodyDTO {
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    public user_name!: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    public password!: string;
}

export class LoginDTO extends DTO {
    public static url = '/login';
    public readonly url: string = LoginDTO.url;
    public readonly method = METHOD.POST;
    public readonly responseDTOClass = LoginResponseDTO;

    public bodyDTO: LoginBodyDTO;
    public paramDTO: undefined;
    public queryDTO: undefined;
}
