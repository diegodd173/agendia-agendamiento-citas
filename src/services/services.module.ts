/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { Service, ServiceSchema } from './schemas/service.schema';

/**
 * Módulo encargado de la gestión de servicios.
 * 
 * Este módulo integra:
 * - El controlador `ServicesController` para manejar las rutas HTTP.
 * - El servicio `ServicesService` para la lógica de negocio.
 * - La entidad `Service` registrada como modelo de Mongoose.
 */
@Module({
  imports: [
    /**
     * Registro del modelo `Service` en Mongoose.
     * 
     * Permite que `ServicesService` interactúe con la colección
     * correspondiente en la base de datos.
     */
    MongooseModule.forFeature([
      {
        name: Service.name,
        schema: ServiceSchema,
      },
    ]),
  ],
  controllers: [ServicesController], // Controlador HTTP del módulo
  providers: [ServicesService], // Lógica de negocio y acceso a datos
  exports: [ServicesService], // Exporta el servicio para otros módulos
})
export class ServicesModule {}
