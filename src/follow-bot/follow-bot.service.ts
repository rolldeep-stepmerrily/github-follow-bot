import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';

import { GithubService } from '../github/github.service.js';

@Injectable()
export class FollowBotService {
  private previousFollowers: Set<string> = new Set();
  private logPath: string;

  constructor(private readonly githubService: GithubService) {
    this.logPath = path.join(os.homedir(), 'logs', 'github-follow-bot.log');
  }

  async log(message: string) {
    await fs.appendFile(this.logPath, `${new Date().toISOString()} - ${message}\n`);
  }

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
        this.log(`New followers: ${newFollowers.join(' ')}`),
        this.log(`Unfollowed followers: ${unfollowedFollowers.join(' ')}`),
      ]);

      this.previousFollowers = currentFollowers;
    } catch (e) {
      console.error(e);
    }
  }
}
