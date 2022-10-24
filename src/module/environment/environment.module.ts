import { Global, Module } from '@nestjs/common';
import { EnvironmentProvider, EnvironmentService } from './environment.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    providers: [EnvironmentProvider],
    exports: [EnvironmentService],
})
export class EnvironmentModule {}
