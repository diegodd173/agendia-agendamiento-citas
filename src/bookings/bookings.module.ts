import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { TimeSlotsModule } from '../time-slots/time-slots.module';

/**
 * Módulo de reservas (BookingsModule)
 * 
 * Este módulo se encarga de gestionar las reservas realizadas por los clientes.
 * Incluye la configuración del esquema Booking, su servicio y controlador,
 * además de importar el módulo de TimeSlots para manejar los espacios de tiempo disponibles.
 */
@Module({
  imports: [
    /**
     * Registra el esquema Booking dentro de Mongoose para este módulo.
     * Permite que el modelo esté disponible para inyección en el servicio.
     */
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),

    /**
     * Importa el módulo TimeSlotsModule para poder utilizar sus servicios,
     * por ejemplo, al reservar o liberar un espacio de tiempo.
     */
    TimeSlotsModule,
  ],

  /**
   * Controlador encargado de manejar las rutas HTTP relacionadas con reservas.
   */
  controllers: [BookingsController],

  /**
   * Servicio que contiene la lógica de negocio para la gestión de reservas.
   */
  providers: [BookingsService],

  /**
   * Exporta el servicio de reservas para que pueda ser utilizado por otros módulos.
   */
  exports: [BookingsService],
})
export class BookingsModule {}
