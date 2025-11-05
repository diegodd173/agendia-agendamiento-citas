import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsEnum(['barbero', 'cliente'])
  @IsNotEmpty()
  rol!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  telefono!: string;
}
