import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './strategies/jwt.strategy';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {}

    async register(registerDto: RegisterDto) {
        const existingUser = await this.userService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new BadRequestException('Email déjà utilisé');
        }
        const user = await this.userService.create(registerDto);
        

        const token = this.generateToken(user.id, user.email);

        const { password, ...result } = user;
        return {
            user: result,
            token: token
        };
    }

    async login(loginDto: LoginDto) {
        const user = await this.userService.findByEmail(loginDto.email);
        if (!user) {
            throw new UnauthorizedException('Email ou mot de passe incorrect');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Email ou mot de passe incorrect');
        }
        const token = this.generateToken(user.id, user.email);
        const { password, ...result } = user;
        return {
            user: result,
            token: token
        };
    }

    private  generateToken (userId: number, email: string) : string {
        const payload: JwtPayload = { sub: userId, email: email, role: 'user' };
        return this.jwtService.sign(payload);
    }
}   
    

