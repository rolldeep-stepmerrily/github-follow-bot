import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { GithubService } from '../github/github.service.js';

@Injectable()
export class FollowBotService {
  constructor(
    private readonly githubService: GithubService,
    @Inject('EXCEPTIONAL_FOLLOWINGS') private readonly EXCEPTIONAL_FOLLOWINGS: string,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async syncFollowers() {
    try {
      const currentFollowers = new Set(await this.githubService.findFollowers());

      const currentFollowing = new Set(await this.githubService.findFollowing());

      //30명씩만 가져오고, 최대는 100이니 100팔로워가 넘어가면 수정하기

      const toFollow = [...currentFollowers].filter((follower) => !currentFollowing.has(follower));

      toFollow.forEach(async (follower) => {
        await this.githubService.followUser(follower);
      });

      const exceptionalFollowings = new Set(this.EXCEPTIONAL_FOLLOWINGS.split('|'));

      const toUnfollow = [...currentFollowing].filter(
        (following) => !currentFollowers.has(following) && !exceptionalFollowings.has(following),
      );

      toUnfollow.forEach(async (following) => {
        await this.githubService.unfollowUser(following);
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }
}
