import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"


export class LoginDto {
  @IsEmail({}, { message: 'Email invalide' })
  @IsNotEmpty({ message: 'Email ne doit pas être vide' })
  email: string

  @IsString({ message: 'le mot de passe doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le mot de passe ne doit pas être vide' })
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  password: string

}
