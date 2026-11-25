import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsIn,
  MinLength,
  MaxLength,
} from 'class-validator';
export class CreateUserDto {
  @IsString({ message: 'le nom doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'le nom est requis' })
  @MinLength(2, { message: 'le nom doit contenir au moins 2 caractères' })
  @MaxLength(30, { message: 'le nom ne doit pas dépasser 30 caractères' })
  name: string;
  
  @IsNotEmpty({ message: 'le mot de passe est requis' })
  @IsString({ message: 'le mot de passe doit être une chaîne de caractères' })
  @MinLength(8, { message: 'le mot de passe doit contenir au moins 8 caractères' })
  @MaxLength(20, { message: 'le mot de passe ne doit pas dépasser 20 caractères' })
  password: string;

  @IsEmail({}, { message: 'le email est invalide' })
  @IsNotEmpty({ message: 'le email est requis' })
  email: string;

  @IsOptional()
  @IsIn(['USER', 'ADMIN'], { message: 'le rôle doit être USER ou ADMIN' })
  role?: 'USER' | 'ADMIN';
}
