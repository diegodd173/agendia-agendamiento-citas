import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

/**
 * DTO (Data Transfer Object) para crear un nuevo bloque de tiempo.
 * Se encarga de validar los datos recibidos antes de que lleguen al servicio o la base de datos.
 */
export class CreateTimeSlotDto {
  /**
   * ID del barbero al que pertenece este bloque de tiempo.
   * Debe ser un ID válido de MongoDB.
   */
  @IsMongoId()
  @IsNotEmpty()
  barbero_id!: string;

  /**
   * Fecha del bloque de tiempo en formato de cadena (por ejemplo: "2025-11-05").
   */
  @IsString()
  @IsNotEmpty()
  fecha!: string;

  /**
   * Hora de inicio del bloque de tiempo (por ejemplo: "09:00").
   */
  @IsString()
  @IsNotEmpty()
  hora_inicio!: string;

  /**
   * Hora de finalización del bloque de tiempo (por ejemplo: "10:00").
   */
  @IsString()
  @IsNotEmpty()
  hora_fin!: string;
}
