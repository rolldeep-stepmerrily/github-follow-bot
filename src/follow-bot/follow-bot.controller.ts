import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FollowBotService } from './follow-bot.service.js';

@ApiTags('follow-bot')
@Controller('follow-bot')
export class FollowBotController {
  constructor(private readonly followbotService: FollowBotService) {}

  @Post()
  async syncFollowers() {
    return this.followbotService.syncFollowers();
  }
}
