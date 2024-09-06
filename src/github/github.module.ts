import { forwardRef, Module } from '@nestjs/common';

import { GithubService } from './github.service.js';
import { GithubController } from './github.controller.js';

@Module({
  providers: [GithubService],
  controllers: [GithubController],
  exports: [GithubService],
})
export class GithubModule {}
