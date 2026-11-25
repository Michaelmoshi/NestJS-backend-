import { Controller, HttpCode, Post , HttpStatus , Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Body } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

     @Throttle({ default: { limit: 5, ttl: 60000 } }) // Limite à 5 requêtes par minute
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Throttle({ default: { limit: 5, ttl: 60000 } }) // Limite à 5 requêtes par minute
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);  
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @HttpCode(HttpStatus.OK)
    getProfile(@Request() req: { user: unknown }) {
        return {
            message: 'Vous avez accédé à votre profil avec succès !',
            user: req.user, // Assuming you have a user object in the request
        };
    }   
}

