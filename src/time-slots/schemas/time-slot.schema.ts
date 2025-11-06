import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type Document, Types } from 'mongoose';

/**
 * Documento de Mongoose que representa un bloque de tiempo (TimeSlot)
 * disponible o asignado a un barbero dentro del sistema de agendamiento.
 */
export type TimeSlotDocument = TimeSlot & Document;

@Schema({ timestamps: true })
export class TimeSlot {
  /**
   * Referencia al barbero (User) que tiene asignado este bloque de tiempo.
   * Se almacena como un ObjectId que apunta al documento del usuario.
   */
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  barbero_id!: Types.ObjectId;

  /**
   * Fecha correspondiente al bloque de tiempo (por ejemplo: "2025-11-05").
   */
  @Prop({ required: true })
  fecha!: string;

  /**
   * Hora de inicio del bloque de tiempo (por ejemplo: "09:00").
   */
  @Prop({ required: true })
  hora_inicio!: string;

  /**
   * Hora de finalización del bloque de tiempo (por ejemplo: "10:00").
   */
  @Prop({ required: true })
  hora_fin!: string;

  /**
   * Indica si el bloque de tiempo está disponible para reservar o no.
   * Por defecto, se crea como `true`.
   */
  @Prop({ default: true })
  disponible!: boolean;

  /**
   * Arreglo de IDs de las citas (bookings) asociadas a este bloque de tiempo.
   * Cada elemento es un ObjectId que referencia a una cita existente.
   */
  @Prop({ type: [Types.ObjectId], default: [] })
  citas_asociadas!: Types.ObjectId[];
}

/**
 * Esquema de Mongoose generado a partir de la clase TimeSlot.
 * Permite definir la estructura de los documentos en la colección "timeslots".
 */
export const TimeSlotSchema = SchemaFactory.createForClass(TimeSlot);
