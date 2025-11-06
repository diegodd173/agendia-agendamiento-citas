import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

/**
 * DTO para la creación de un nuevo servicio.
 * Define las validaciones que deben cumplirse al crear un servicio.
 */
export class CreateServiceDto {
  /**
   * Nombre del servicio (ej. "Corte de cabello", "Afeitado clásico").
   * - Debe ser una cadena de texto.
   * - Es obligatorio.
   */
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  /**
   * Duración del servicio en minutos (ej. 30, 45, 60).
   * - Debe ser un número.
   * - Es obligatorio.
   */
  @IsNumber()
  @IsNotEmpty()
  duracion_minutos!: number;

  /**
   * Precio del servicio en la moneda configurada (ej. 25000).
   * - Debe ser un número.
   * - Es obligatorio.
   */
  @IsNumber()
  @IsNotEmpty()
  precio!: number;

  /**
   * Descripción opcional del servicio.
   * - Debe ser una cadena de texto si se proporciona.
   */
  @IsString()
  descripcion?: string;
}
