import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

/**
 * DTO (Data Transfer Object) utilizado para validar los datos
 * al crear una nueva reserva (Booking).
 *
 * Este DTO asegura que los campos obligatorios se proporcionen
 * y que los identificadores sean válidos según el formato de MongoDB.
 */
export class CreateBookingDto {
  /** ID del cliente que realiza la reserva. */
  @IsMongoId()
  @IsNotEmpty()
  cliente_id!: string;

  /** ID del barbero que atenderá la cita. */
  @IsMongoId()
  @IsNotEmpty()
  barbero_id!: string;

  /** ID del servicio solicitado (ej. corte, afeitado, etc.). */
  @IsMongoId()
  @IsNotEmpty()
  servicio_id!: string;

  /** Fecha de la reserva en formato string (ej: '2025-11-05'). */
  @IsString()
  @IsNotEmpty()
  fecha!: string;

  /** Hora de inicio del servicio (ej: '10:00'). */
  @IsString()
  @IsNotEmpty()
  hora_inicio!: string;

  /** Hora de finalización del servicio (ej: '10:30'). */
  @IsString()
  @IsNotEmpty()
  hora_fin!: string;

  /** ID del bloque horario (time slot) asociado a la reserva. */
  @IsMongoId()
  @IsNotEmpty()
  time_slot_id!: string;

  /** Observaciones opcionales del cliente o el barbero. */
  @IsString()
  observaciones?: string;
}
