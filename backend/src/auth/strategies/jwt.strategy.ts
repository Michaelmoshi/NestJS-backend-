import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from "../../users/users.service";
import { UnauthorizedException } from "@nestjs/common";

export interface JwtPayload {
  sub: number;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly UserService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }
  async validate(payload: JwtPayload) {
    const user = await this.UserService.findOne(payload.sub); 
    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }  
    const { password, ...result } = user;
    return result;
}   
}