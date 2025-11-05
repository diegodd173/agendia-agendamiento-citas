import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type Document, Types } from 'mongoose';

export type TimeSlotDocument = TimeSlot & Document;

@Schema({ timestamps: true })
export class TimeSlot {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  barbero_id!: Types.ObjectId;

  @Prop({ required: true })
  fecha!: string;

  @Prop({ required: true })
  hora_inicio!: string;

  @Prop({ required: true })
  hora_fin!: string;

  @Prop({ default: true })
  disponible!: boolean;

  @Prop({ type: [Types.ObjectId], default: [] })
  citas_asociadas!: Types.ObjectId[];
}

export const TimeSlotSchema = SchemaFactory.createForClass(TimeSlot);
