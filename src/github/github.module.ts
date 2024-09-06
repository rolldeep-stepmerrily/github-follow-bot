import { forwardRef, Module } from '@nestjs/common';

import { GithubService } from './github.service.js';
import { GithubController } from './github.controller.js';
import { FollowBotModule } from 'src/follow-bot/follow-bot.module.js';

@Module({
  imports: [forwardRef(() => FollowBotModule)],
  providers: [GithubService],
  controllers: [GithubController],
  exports: [GithubService],
})
export class GithubModule {}
