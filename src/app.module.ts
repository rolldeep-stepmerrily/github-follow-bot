import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { HttpLoggerMiddleware } from './common/middlewares';

@Module({
  imports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
