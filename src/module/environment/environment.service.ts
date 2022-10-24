import { ValueProvider } from '@nestjs/common';
import { plainToClass, Transform } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

export class Environment {
    @IsString()
    public JWT_SECRET = 'jwt-secret';

    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    public TOKEN_EXPIRE = 3000;
}

export class EnvironmentService {
    public readonly ENVIRONMENT: Environment;

    constructor() {
        this.ENVIRONMENT = plainToClass(Environment, process.env, {
            excludeExtraneousValues: true,
        });
        const res = validateSync(this.ENVIRONMENT);
        if (res.length) {
            console.log(this.ENVIRONMENT);
            throw res;
        }
    }
}

export const EnvironmentProvider: ValueProvider<EnvironmentService> = {
    provide: EnvironmentService,
    useValue: new EnvironmentService(),
};
