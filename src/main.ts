import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

<<<<<<< HEAD
  // 🔹 HABILITAR CORS
  app.enableCors({
    origin: 'http://localhost:5173',
=======
  // Habilitar CORS para que el frontend pueda hacer peticiones
  app.enableCors({
    origin: 'http://localhost:5173', // Must be specific when credentials: true
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
>>>>>>> 5f80ce5b44d0a6fdf7b270a43651cae2ff38057e
    credentials: true,
  });

  // Prefijo global: /api
  app.setGlobalPrefix('api');

  // Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger (documentación API)
  const config = new DocumentBuilder()
    .setTitle('RENAV CRM API')
    .setDescription('API del CRM inmobiliario con NestJS')
    .setVersion('1.0')
    .addBearerAuth() // para JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`API corriendo en http://localhost:${port}/api`);
  console.log(`Swagger en http://localhost:${port}/api/docs`);
}

bootstrap();
