import {
  IsString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Matches,
  Length,
} from 'class-validator';

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
   * Debe ser una cadena de texto no vacía y solo puede contener letras y espacios.
   * Se limita entre 2 y 50 caracteres.
   */
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  @Length(2, 50, {
    message: 'El nombre debe tener entre 2 y 50 caracteres',
  })
  nombre!: string;

  /**
   * Rol del usuario dentro del sistema.
   * Solo se aceptan los valores definidos en el enum `UserRole`.
   */
  @IsEnum(UserRole, {
    message: 'El rol debe ser "barbero" o "cliente"',
  })
  @IsNotEmpty({ message: 'El rol no puede estar vacío' })
  rol!: UserRole;

  /**
   * Correo electrónico del usuario.
   * Debe ser un email válido y no puede estar vacío.
   */
  @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' })
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
  email!: string;

  /**
   * Número de teléfono de contacto del usuario.
   * Debe contener únicamente números, con una longitud de entre 7 y 15 dígitos.
   */
  @IsString()
  @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
  @Matches(/^[0-9]+$/, {
    message: 'El teléfono solo debe contener números',
  })
  @Length(7, 15, {
    message: 'El teléfono debe tener entre 7 y 15 dígitos',
  })
  telefono!: string;
}
