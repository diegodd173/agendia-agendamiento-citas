import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.enableCors();

  const PORT = process.env.PORT;
  if (!PORT) {
    throw new Error('La variable de entorno MONGODB_URI no está definida');
  }
  await app.listen(PORT);
  console.log(`Appointment Scheduling Microservice running on port ${PORT}`);
}

bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
});
