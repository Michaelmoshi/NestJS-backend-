import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"


export class RegisterDto {
  @IsString({ message: 'le nom doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le nom ne doit pas être vide' })
  @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères' })
  @MaxLength(20, { message: 'Le nom ne doit pas dépasser 20 caractères' })
  name: string

  @IsEmail({}, { message: 'Email invalide' })
  @IsNotEmpty({ message: 'Email ne doit pas être vide' })
  email: string

  @IsString({ message: 'le mot de passe doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le mot de passe ne doit pas être vide' })
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  password: string

  @IsOptional()
  @IsIn(['USER', 'ADMIN'], { message: 'Le rôle doit être soit "USER" soit "ADMIN"' })
  role?: 'USER' | 'ADMIN'

}
