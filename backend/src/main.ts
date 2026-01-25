import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DevDelayInterceptor } from './common/interceptors/dev-delay.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  // Add dev delay interceptor (simulates network latency in development)
  app.useGlobalInterceptors(new DevDelayInterceptor());

  // API prefix
  app.setGlobalPrefix('api');

  await app.listen(3000);
  console.log('Backend running on http://localhost:3000');
}
bootstrap();
