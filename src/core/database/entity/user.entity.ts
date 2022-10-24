import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GENDER } from 'shared/business/database';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('user')
@Exclude()
export class UserEntity extends BaseEntity {
    @Expose()
    @PrimaryColumn()
    @Column()
    @IsString()
    @IsNotEmpty()
    public user_name: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    public password: string;

    @Expose()
    @Column()
    @IsNotEmpty()
    @IsString()
    public name: string;

    @Expose()
    @Column()
    @IsOptional()
    @IsString()
    public phone_number?: string;

    @Expose()
    @Column()
    @IsOptional()
    @IsString()
    public email?: string;

    @Expose()
    @Column()
    @IsEnum(GENDER)
    @IsOptional()
    public gender?: GENDER;
}
