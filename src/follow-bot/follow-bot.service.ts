import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { GithubService } from '../github/github.service.js';

@Injectable()
export class FollowBotService {
  private previousFollowers: Set<string> = new Set();
  private readonly logger = new Logger(FollowBotService.name);

  constructor(private readonly githubService: GithubService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async syncFollowers() {
    try {
      const currentFollowers = new Set(await this.githubService.findFollowers());

      const newFollowers = [...currentFollowers].filter((follower) => !this.previousFollowers.has(follower));
      const unfollowedFollowers = [...this.previousFollowers].filter((follower) => !currentFollowers.has(follower));

      await Promise.all([
        ...newFollowers.map(async (follower) => {
          await this.githubService.followUser(follower);
        }),
        ...unfollowedFollowers.map(async (follower) => {
          await this.githubService.unfollowUser(follower);
        }),
      ]);

      this.logger.log(`Followed: ${newFollowers.join(', ')}`);
      this.logger.log(`Unfollowed: ${unfollowedFollowers.join(', ')}`);

      this.previousFollowers = currentFollowers;
    } catch (e) {
      this.logger.error(e.stack);
    }
  }
}
