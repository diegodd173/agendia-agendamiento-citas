import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { TimeSlotsModule } from './time-slots/time-slots.module';
import { BookingsModule } from './bookings/bookings.module';

/**
 * Módulo raíz de la aplicación.
 * Configura la conexión con MongoDB, carga las variables de entorno y
 * agrupa los módulos principales del microservicio de agendamiento.
 */
@Module({
  imports: [
    /**
     * Carga las variables de entorno desde el archivo `.env`
     * y las hace accesibles globalmente en toda la aplicación.
     */
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    /**
     * Configura la conexión a MongoDB de forma asíncrona,
     * usando las variables de entorno administradas por ConfigService.
     */
    MongooseModule.forRootAsync({
      imports: [ConfigModule],

      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        if (!uri) {
          throw new Error(
            'La variable de entorno MONGODB_URI no está definida en ConfigService',
          );
        }

        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),

    /**
     * Módulos funcionales que encapsulan las distintas áreas del microservicio:
     * - UsersModule: gestión de usuarios
     * - ServicesModule: definición de servicios ofrecidos
     * - TimeSlotsModule: manejo de horarios disponibles
     * - BookingsModule: administración de reservas
     */
    UsersModule,
    ServicesModule,
    TimeSlotsModule,
    BookingsModule,
  ],
})
export class AppModule {}
