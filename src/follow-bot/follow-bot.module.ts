import { forwardRef, Module } from '@nestjs/common';

import { GithubModule } from '../github/github.module.js';
import { FollowBotService } from './follow-bot.service.js';
import { FollowBotController } from './follow-bot.controller.js';

@Module({
  imports: [forwardRef(() => GithubModule)],
  providers: [FollowBotService],
  controllers: [FollowBotController],
})
export class FollowBotModule {}
