import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type Document, Types } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  cliente_id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  barbero_id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Service', required: true })
  servicio_id!: Types.ObjectId;

  @Prop({ required: true })
  fecha!: string;

  @Prop({ required: true })
  hora_inicio!: string;

  @Prop({ required: true })
  hora_fin!: string;

  @Prop({
    enum: ['confirmada', 'cancelada', 'completada'],
    default: 'confirmada',
  })
  estado!: string;

  @Prop({ required: false })
  observaciones!: string;

  @Prop({ type: Types.ObjectId, ref: 'TimeSlot', required: true })
  time_slot_id!: Types.ObjectId;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
