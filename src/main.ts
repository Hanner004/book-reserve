import { ConfigService } from '@nestjs/config';
import { LoggerService } from './settings/logger';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {

  const configService = new ConfigService();
  const logger = new LoggerService();
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.use(bodyParser.json({ limit: '50mb' }));
  // app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors({ origin: '*' });
  const proyect = 'book-reserve';
  app.setGlobalPrefix(`api/v1/${proyect}`);

  const username = configService.get<string>('SWAGGER_USER');
  const password = configService.get<string>('SWAGGER_PASS');

  app.use(
    `/api/v1/${proyect}/docs`,
    basicAuth({
      challenge: true,
      users: {
        [username]: password,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(`${proyect}`)
    .setDescription('API documentation')
    .setVersion('1.0.1')
    .addBasicAuth()
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/api/v1/${proyect}/docs`, app, document, {
    // explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });

  const port = configService.get<number>('HTTP_SERVER_PORT');
  await app.listen(port, '0.0.0.0', () => {
    logger.log('APP', `${proyect} is running on http://localhost:${port}`);
    logger.debug(
      'APP',
      `Swagger is running on http://localhost:${port}/api/v1/${proyect}/docs`,
    );
  });
  
}
bootstrap();
