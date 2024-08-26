import { Injectable } from '@nestjs/common';

import { GithubService } from '../github/github.service.js';

@Injectable()
export class FollowBotService {
  private previousFollowers: Set<string> = new Set();

  constructor(private readonly githubService: GithubService) {}

  async syncFollowers() {
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

    this.previousFollowers = currentFollowers;
  }
}
