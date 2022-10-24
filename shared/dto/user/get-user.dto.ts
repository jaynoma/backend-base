import { Expose } from 'class-transformer';
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

@Expose()
export class GetProfileResponseDTO {
    @IsString()
    @IsNotEmpty()
    public user_name!: string;

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

export class GetProfileDTO extends DTO {
    public static url = '/user';
    public readonly url: string = GetProfileDTO.url;
    public readonly method = METHOD.GET;
    public readonly responseDTOClass = GetProfileResponseDTO;

    public bodyDTO: undefined;
    public paramDTO: undefined;
    public queryDTO: undefined;
}
