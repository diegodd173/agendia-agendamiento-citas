import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeSlotsService } from './time-slots.service';
import { TimeSlotsController } from './time-slots.controller';
import { TimeSlot, TimeSlotSchema } from './schemas/time-slot.schema';

/**
 * Módulo encargado de gestionar los bloques de tiempo (TimeSlots).
 * 
 * Este módulo se encarga de:
 * - Importar el esquema de Mongoose correspondiente.
 * - Exponer el controlador y servicio para manejar la lógica de negocio.
 * - Permitir que otros módulos utilicen el servicio a través del `export`.
 */
@Module({
  imports: [
    /**
     * Registro del modelo `TimeSlot` dentro de Mongoose.
     * Esto permite que el servicio pueda interactuar con la colección correspondiente en la base de datos.
     */
    MongooseModule.forFeature([
      {
        name: TimeSlot.name,
        schema: TimeSlotSchema,
      },
    ]),
  ],
  /**
   * Controlador responsable de definir las rutas y endpoints del módulo.
   */
  controllers: [TimeSlotsController],

  /**
   * Servicio que contiene la lógica de negocio y operaciones sobre la base de datos.
   */
  providers: [TimeSlotsService],

  /**
   * Exporta el servicio para que pueda ser utilizado en otros módulos del proyecto.
   */
  exports: [TimeSlotsService],
})
export class TimeSlotsModule {}
