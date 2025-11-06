import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type Document, Types } from 'mongoose';

/**
 * Documento que representa una reserva (Booking) en la base de datos.
 * Incluye información sobre el cliente, barbero, servicio, horarios y estado.
 */
export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  /** Referencia al usuario que realiza la reserva (cliente). */
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  cliente_id!: Types.ObjectId;

  /** Referencia al usuario que presta el servicio (barbero). */
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  barbero_id!: Types.ObjectId;

  /** Referencia al servicio seleccionado (ej. corte, barba, etc.). */
  @Prop({ type: Types.ObjectId, ref: 'Service', required: true })
  servicio_id!: Types.ObjectId;

  /** Fecha de la reserva (ejemplo: '2025-11-05'). */
  @Prop({ required: true })
  fecha!: string;

  /** Hora de inicio de la cita (ejemplo: '10:00'). */
  @Prop({ required: true })
  hora_inicio!: string;

  /** Hora de finalización de la cita (ejemplo: '10:30'). */
  @Prop({ required: true })
  hora_fin!: string;

  /**
   * Estado actual de la reserva.
   * - confirmada: la cita está activa.
   * - cancelada: la cita fue cancelada por el cliente o barbero.
   * - completada: el servicio fue realizado.
   */
  @Prop({
    enum: ['confirmada', 'cancelada', 'completada'],
    default: 'confirmada',
  })
  estado!: string;

  /** Campo opcional para observaciones o notas adicionales. */
  @Prop({ required: false })
  observaciones!: string;

  /** Referencia al bloque horario asociado (TimeSlot) para esta reserva. */
  @Prop({ type: Types.ObjectId, ref: 'TimeSlot', required: true })
  time_slot_id!: Types.ObjectId;
}

/** Esquema de Mongoose generado a partir de la clase Booking. */
export const BookingSchema = SchemaFactory.createForClass(Booking);
