import { forwardRef, Module } from '@nestjs/common';

import { GithubModule } from '../github/github.module.js';
import { FollowBotService } from './follow-bot.service.js';

@Module({
  imports: [forwardRef(() => GithubModule)],
  providers: [FollowBotService],
})
export class FollowBotModule {}
