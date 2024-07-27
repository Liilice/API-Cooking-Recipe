import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cooking Recipe')
    .setDescription('The Cooking Recipe API description')
    .setVersion('1.0')
    .addTag('Cooking Recipe')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: '',
  });

  await app.listen(3000);
}
bootstrap();
