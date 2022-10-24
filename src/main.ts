import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<INestApplication>(AppModule, {
        logger: true,
    });
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );
    console.log('start with port: ' + 9000);
    await app.listen(9000);
}
bootstrap();
