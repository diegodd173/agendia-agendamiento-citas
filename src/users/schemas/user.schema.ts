import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Esquema de usuario para la base de datos MongoDB.
 * Se utiliza con Mongoose y define la estructura de los documentos
 * almacenados en la colección `users`.
 *
 * `timestamps: true` agrega automáticamente los campos:
 * - `createdAt`: fecha de creación del documento
 * - `updatedAt`: fecha de última modificación
 */
@Schema({ timestamps: true })
export class User {
  /**
   * Nombre completo del usuario.
   */
  @Prop({ required: true })
  nombre!: string;

  /**
   * Rol del usuario dentro del sistema.
   * Solo se permiten los valores 'barbero' o 'cliente'.
   */
  @Prop({ enum: ['barbero', 'cliente'], required: true })
  rol!: string;

  /**
   * Correo electrónico único del usuario.
   * Se marca como `unique` para evitar duplicados en la colección.
   */
  @Prop({ required: true, unique: true })
  email!: string;

  /**
   * Número de teléfono del usuario.
   */
  @Prop({ required: true })
  telefono!: string;
}

/**
 * Tipo auxiliar que combina la clase `User` con las propiedades del documento de Mongoose.
 * Permite usar tipado fuerte al trabajar con instancias de este modelo.
 */
export type UserDocument = User & Document;

/**
 * Genera el esquema Mongoose a partir de la clase `User`.
 * Este esquema se utiliza en la definición del modelo dentro del módulo correspondiente.
 */
export const UserSchema = SchemaFactory.createForClass(User);
