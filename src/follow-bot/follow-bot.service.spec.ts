import { Test, TestingModule } from '@nestjs/testing';

import { FollowBotService } from './follow-bot.service.js';

describe('FollowBotService', () => {
  let service: FollowBotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowBotService],
    }).compile();

    service = module.get<FollowBotService>(FollowBotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
