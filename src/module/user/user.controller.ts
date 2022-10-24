import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    CreateUserBodyDTO,
    CreateUserDTO,
} from 'shared/dto/user/create-user.dto';
import {
    GetProfileDTO,
    GetProfileResponseDTO,
} from 'shared/dto/user/get-user.dto';
import { JWTContent } from 'src/core/auth/auth.decorator';
import { JWTPayload } from 'src/core/auth/auth.payload';
import { UserService } from './user.service';

@Controller()
@UseGuards(AuthGuard())
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post(CreateUserDTO.url)
    create(@Body() createUserDto: CreateUserBodyDTO) {
        return this.userService.create(createUserDto);
    }

    @Get(GetProfileDTO.url)
    async getProfile(
        @JWTContent() jwtPayload: JWTPayload,
    ): Promise<GetProfileResponseDTO> {
        return this.userService.getProfile(jwtPayload.user_id);
    }
}
