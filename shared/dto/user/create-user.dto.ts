import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';
import { GENDER } from 'shared/business/database';
import { DTO, METHOD } from '../base.dto';

export class CreateUserResponseDTO {
    @IsString()
    @IsNotEmpty()
    public user_name!: string;

    @IsString()
    @IsNotEmpty()
    public password!: string;

    @IsNumber()
    @IsNotEmpty()
    @MaxLength(225)
    public name!: string;

    @IsOptional()
    @IsString()
    public phone_number?: string;

    @IsOptional()
    @IsEmail()
    public email?: string;

    @IsEnum(GENDER)
    @IsOptional()
    public gender?: GENDER;
}

export class CreateUserBodyDTO {
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    public user_name!: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    public password!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(225)
    public name!: string;

    @IsOptional()
    @IsString()
    public phone_number?: string;

    @IsOptional()
    @IsEmail()
    public email?: string;

    @IsEnum(GENDER)
    @IsOptional()
    public gender?: GENDER;
}

export class CreateUserDTO extends DTO {
    public static url = '/user';
    public readonly url: string = CreateUserDTO.url;
    public readonly method = METHOD.POST;
    public readonly responseDTOClass = CreateUserResponseDTO;

    public bodyDTO: CreateUserBodyDTO;
    public paramDTO: undefined;
    public queryDTO: undefined;
}
