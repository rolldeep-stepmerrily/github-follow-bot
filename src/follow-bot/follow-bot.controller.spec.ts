import { Test, TestingModule } from '@nestjs/testing';

import { FollowBotController } from './follow-bot.controller';

describe('FollowBotController', () => {
  let controller: FollowBotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowBotController],
    }).compile();

    controller = module.get<FollowBotController>(FollowBotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
