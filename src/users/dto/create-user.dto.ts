import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

/**
 * Enum que define los roles válidos para un usuario.
 * Evita valores arbitrarios y permite validación estricta.
 */
export enum UserRole {
  BARBERO = 'barbero',
  CLIENTE = 'cliente',
}

/**
 * DTO (Data Transfer Object) usado al crear un nuevo usuario.
 * Garantiza que los datos cumplan con las validaciones necesarias
 * antes de llegar al servicio o a la base de datos.
 */
export class CreateUserDto {
  /**
   * Nombre completo del usuario.
   * Debe ser una cadena de texto no vacía.
   */
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  /**
   * Rol del usuario dentro del sistema.
   * Solo se aceptan los valores definidos en el enum `UserRole`.
   */
  @IsEnum(UserRole)
  @IsNotEmpty()
  rol!: UserRole;

  /**
   * Correo electrónico del usuario.
   * Debe ser un email válido y no puede estar vacío.
   */
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  /**
   * Número de teléfono de contacto del usuario.
   * Debe ser una cadena de texto no vacía.
   */
  @IsString()
  @IsNotEmpty()
  telefono!: string;
}
