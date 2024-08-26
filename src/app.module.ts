import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HttpLoggerMiddleware } from './common/middlewares/http-logger.middleware.js';
import { GithubModule } from './github/github.module.js';
import { ConfigProviderModule } from './common/config-provider/config-provider.module.js';

import Joi from 'joi';
import { FollowBotModule } from './follow-bot/follow-bot.module.js';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().default(3067),
        GITHUB_TOKEN: Joi.string().required(),
        GITHUB_USERNAME: Joi.string().required(),
      }),
      envFilePath: '.env',
      isGlobal: true,
      validationOptions: { abortEarly: true },
    }),
    GithubModule,
    ConfigProviderModule,
    FollowBotModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
