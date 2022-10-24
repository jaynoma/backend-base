import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../core/database/entity/user.entity';
import { CreateUserBodyDTO } from 'shared/dto/user/create-user.dto';
import { Repository } from 'typeorm';
import { generateHash } from 'shared/utils/password';
import { GetProfileResponseDTO } from 'shared/dto/user/get-user.dto';
import { plainToClass } from 'class-transformer';
import { SYSTEM_CODE } from 'shared/dto/system-code';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
    ) {}

    async create(body: CreateUserBodyDTO): Promise<any> {
        const user = await this.userRepo.insert({
            ...body,
            password: await generateHash(body.password),
        });
        return user;
    }

    findByUsername(user_name: string): Promise<UserEntity> {
        return this.userRepo.findOne({
            user_name,
        });
    }

    public async findById(id: string): Promise<GetProfileResponseDTO> {
        const user = await this.userRepo.findOne(id);
        if (!user) {
            throw new InternalServerErrorException(SYSTEM_CODE.BAD_REQUEST);
        }
        return plainToClass(GetProfileResponseDTO, user);
    }

    async getProfile(id: string): Promise<GetProfileResponseDTO> {
        const user = await this.userRepo.findOne(id);
        return plainToClass(UserEntity, user);
    }

    // async update(id: number, updateUserDto: UpdateUserDto): Promise<boolean> {
    //     const userExisted = await this.userRepo.findOne(id);
    //     if (!userExisted) {
    //         throw new BadRequestException("User don't exist");
    //     }
    //     await this.userRepo.update(id, updateUserDto);
    //     return true;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} user`;
    // }
}
