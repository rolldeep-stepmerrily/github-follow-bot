import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HttpLoggerMiddleware } from './common/middlewares/http-logger.middleware.js';
import { GithubModule } from './github/github.module.js';
import { ConfigProviderModule } from './common/config-provider/config-provider.module.js';
import { FollowBotService } from './follow-bot/follow-bot.service';
import { FollowBotModule } from './follow-bot/follow-bot.module';
import Joi from 'joi';

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
  ],
  providers: [FollowBotService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
