import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

/**
 * Punto de entrada del microservicio de agendamiento de citas.
 * Configura validaciones globales, CORS y arranca el servidor.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación global: elimina y bloquea propiedades no permitidas en los DTOs
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  // Permite peticiones desde otros orígenes (frontend, otros microservicios, etc.)
  app.enableCors();

  const PORT = process.env.PORT;
  if (!PORT) {
    // Mensaje corregido: la variable de entorno esperada es PORT, no MONGODB_URI
    throw new Error('La variable de entorno PORT no está definida');
  }

  await app.listen(PORT);
  console.log(`Appointment Scheduling Microservice running on port ${PORT}`);
}

bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
});
