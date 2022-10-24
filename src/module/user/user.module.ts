import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../core/database/entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserService],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule {}
