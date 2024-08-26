import { Module } from '@nestjs/common';

import { GithubModule } from 'src/github/github.module.js';
import { FollowBotService } from './follow-bot.service.js';

@Module({
  imports: [GithubModule],
  providers: [FollowBotService],
})
export class FollowBotModule {}
