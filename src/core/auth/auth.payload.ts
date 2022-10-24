import { IsNotEmpty, IsString } from 'class-validator';

export class JWTPayload {
    @IsString()
    @IsNotEmpty()
    public user_id!: string;

    @IsString()
    @IsNotEmpty()
    public user_name!: string;
}
