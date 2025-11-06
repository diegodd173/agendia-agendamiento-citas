import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';

/**
 * Módulo encargado de la gestión de usuarios.
 *
 * Se encarga de:
 * - Definir el modelo `User` con Mongoose.
 * - Exponer el controlador y servicio de usuarios.
 * - Permitir la reutilización de `UsersService` en otros módulos.
 */
@Module({
  imports: [
    /**
     * Registra el esquema de usuario en Mongoose.
     * 
     * Esto permite inyectar el modelo `User` mediante `@InjectModel(User.name)`
     * dentro del servicio `UsersService` para realizar operaciones con MongoDB.
     */
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],

  // Controlador que maneja las rutas HTTP relacionadas con usuarios
  controllers: [UsersController],

  // Servicio que contiene la lógica de negocio y acceso a la base de datos
  providers: [UsersService],

  /**
   * Exporta el servicio para que otros módulos (por ejemplo `BookingsModule`)
   * puedan reutilizar la lógica o consultar usuarios si es necesario.
   */
  exports: [UsersService],
})
export class UsersModule {}
