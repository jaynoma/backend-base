import { Body, Controller, Post } from '@nestjs/common';
import { LoginBodyDTO, LoginDTO, LoginResponseDTO } from 'shared/dto/login.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post(LoginDTO.url)
    login(@Body() body: LoginBodyDTO): Promise<LoginResponseDTO> {
        return this.authService.login(body);
    }
}
