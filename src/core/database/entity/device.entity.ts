import { IsBoolean, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('device')
export class DeviceEntity {
    @PrimaryGeneratedColumn()
    public id: string;

    @Column()
    @IsString()
    public user_id!: string;

    @Column()
    @IsString()
    public value!: string;

    @Column()
    @IsBoolean()
    public status: boolean;
}
