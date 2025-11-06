import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  Matches,
  IsDateString,
  Length,
} from 'class-validator';

/**
 * DTO (Data Transfer Object) para crear un nuevo bloque de tiempo.
 * Se encarga de validar los datos recibidos antes de que lleguen al servicio o la base de datos.
 */
export class CreateTimeSlotDto {
  /**
   * ID del barbero al que pertenece este bloque de tiempo.
   * Debe ser un ID válido de MongoDB.
   */
  @IsMongoId({ message: 'El ID del barbero no es válido.' })
  @IsNotEmpty({ message: 'El campo barbero_id es obligatorio.' })
  barbero_id!: string;

  /**
   * Fecha del bloque de tiempo.
   * Debe ser una fecha válida en formato ISO (por ejemplo: "2025-11-05").
   */
  @IsDateString({}, { message: 'La fecha debe tener un formato de fecha válido (YYYY-MM-DD).' })
  @IsNotEmpty({ message: 'La fecha es obligatoria.' })
  fecha!: string;

  /**
   * Hora de inicio del bloque de tiempo (por ejemplo: "09:00").
   * Debe estar en formato HH:mm de 24 horas.
   */
  @IsString({ message: 'La hora de inicio debe ser una cadena.' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'La hora de inicio debe estar en formato HH:mm (00:00 a 23:59).',
  })
  @IsNotEmpty({ message: 'La hora de inicio es obligatoria.' })
  hora_inicio!: string;

  /**
   * Hora de finalización del bloque de tiempo (por ejemplo: "10:00").
   * Debe estar en formato HH:mm de 24 horas.
   */
  @IsString({ message: 'La hora de finalización debe ser una cadena.' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'La hora de finalización debe estar en formato HH:mm (00:00 a 23:59).',
  })
  @IsNotEmpty({ message: 'La hora de finalización es obligatoria.' })
  hora_fin!: string;
}
