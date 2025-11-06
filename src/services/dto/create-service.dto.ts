import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  Length,
  Min,
} from 'class-validator';

/**
 * DTO para la creación de un nuevo servicio.
 * Define las validaciones que deben cumplirse al crear un servicio.
 */
export class CreateServiceDto {
  /**
   * Nombre del servicio (ej. "Corte de cabello", "Afeitado clásico").
   * - Debe ser una cadena de texto.
   * - Es obligatorio.
   * - Longitud mínima de 3 y máxima de 50 caracteres.
   */
  @IsString({ message: 'El nombre del servicio debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre del servicio no puede estar vacío' })
  @Length(3, 50, {
    message: 'El nombre del servicio debe tener entre 3 y 50 caracteres',
  })
  nombre!: string;

  /**
   * Duración del servicio en minutos (ej. 30, 45, 60).
   * - Debe ser un número entero positivo.
   * - Es obligatorio.
   */
  @IsNumber({}, { message: 'La duración debe ser un número válido' })
  @IsNotEmpty({ message: 'La duración del servicio es obligatoria' })
  @Min(1, { message: 'La duración mínima debe ser de 1 minuto' })
  duracion_minutos!: number;

  /**
   * Precio del servicio en la moneda configurada (ej. 25000).
   * - Debe ser un número positivo.
   * - Es obligatorio.
   */
  @IsNumber({}, { message: 'El precio debe ser un número válido' })
  @IsNotEmpty({ message: 'El precio del servicio es obligatorio' })
  @Min(1, { message: 'El precio debe ser mayor que 0' })
  precio!: number;

  /**
   * Descripción opcional del servicio.
   * - Debe ser una cadena de texto si se proporciona.
   * - Longitud máxima de 200 caracteres.
   */
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsOptional()
  @Length(0, 200, {
    message: 'La descripción no puede superar los 200 caracteres',
  })
  descripcion?: string;
}
