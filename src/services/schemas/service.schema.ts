import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Esquema Mongoose que representa un servicio disponible.
 * Ejemplo: Corte de cabello, Afeitado clásico, Tinte, etc.
 * 
 * Usa decoradores de `@nestjs/mongoose` para definir los campos
 * y sus restricciones en la base de datos.
 */
@Schema({ timestamps: true })
export class Service {
  /**
   * Nombre del servicio.
   * - Obligatorio.
   * - Ejemplo: "Corte de cabello"
   */
  @Prop({ required: true })
  nombre!: string;

  /**
   * Duración del servicio en minutos.
   * - Obligatorio.
   * - Ejemplo: 30, 45, 60
   */
  @Prop({ required: true })
  duracion_minutos!: number;

  /**
   * Precio del servicio.
   * - Obligatorio.
   * - Ejemplo: 25000
   */
  @Prop({ required: true })
  precio!: number;

  /**
   * Descripción opcional del servicio.
   * - Ejemplo: "Incluye lavado y peinado"
   */
  @Prop()
  descripcion?: string;
}

/**
 * Tipo de documento asociado al esquema de Mongoose.
 * Permite usar métodos y propiedades del documento en consultas.
 */
export type ServiceDocument = Service & Document;

/**
 * Fábrica que genera el esquema de Mongoose para la clase `Service`.
 */
export const ServiceSchema = SchemaFactory.createForClass(Service);
