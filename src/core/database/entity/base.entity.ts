import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import {
    PrimaryGeneratedColumn,
    BeforeInsert,
    BeforeUpdate,
    Column,
} from 'typeorm';

export class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    @Type(() => Date)
    @IsDate()
    public create_date?: Date;

    @Column()
    @Type(() => Date)
    @IsDate()
    public update_date?: Date;

    @BeforeInsert()
    protected generateDateBeforeInsert(): void {
        this.create_date = new Date();
        this.update_date = this.create_date;
    }

    @BeforeUpdate()
    protected generateDateBeforeUpdate(): void {
        this.update_date = new Date();
    }
}
