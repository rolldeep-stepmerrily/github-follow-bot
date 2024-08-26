import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module.js';
import { TransformInterceptor } from './common/interceptors/transform.interceptor.js';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  const isProduction = configService.getOrThrow<string>('NODE_ENV') === 'production';

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: isProduction,
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  if (isProduction) {
    app.use(helmet());
  } else {
    const config = new DocumentBuilder().setTitle('github follow bot').setDescription('github 맞팔 봇').build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('/docs', app, document, {
      swaggerOptions: {
        defaultModelsExpandDepth: 0,
        persistAuthorization: true,
        syntaxHighlight: { theme: 'arta' },
        tryItOutEnabled: true,
        tagsSorter: 'alpha',
      },
    });
  }

  await app.listen(configService.getOrThrow<number>('PORT'));
}
bootstrap();
