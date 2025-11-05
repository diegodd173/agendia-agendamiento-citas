import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { TimeSlotsModule } from './time-slots/time-slots.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

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
          uri: uri,
          // Opciones de conexión adicionales si las necesitas:
          // useNewUrlParser: true,
          // useUnifiedTopology: true,
        };
      },
      inject: [ConfigService],
    }),

    UsersModule,
    ServicesModule,
    TimeSlotsModule,
    BookingsModule,
  ],
})
export class AppModule {}
