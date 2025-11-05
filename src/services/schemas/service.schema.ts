import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Service {
  @Prop({ required: true })
  nombre!: string;

  @Prop({ required: true })
  duracion_minutos!: number;

  @Prop({ required: true })
  precio!: number;

  @Prop()
  descripcion?: string;
}

export type ServiceDocument = Service & Document;
export const ServiceSchema = SchemaFactory.createForClass(Service);
