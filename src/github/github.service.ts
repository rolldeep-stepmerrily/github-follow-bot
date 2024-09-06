import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Octokit } from '@octokit/rest';

@Injectable()
export class GithubService {
  private octokit: Octokit;
  private username: string;

  constructor(
    @Inject('GITHUB_TOKEN') private GITHUB_TOKEN: string,
    @Inject('GITHUB_USERNAME') private GITHUB_USERNAME: string,
  ) {
    this.octokit = new Octokit({ auth: this.GITHUB_TOKEN });
    this.username = this.GITHUB_USERNAME;
  }

  async findFollowers() {
    try {
      const response = await this.octokit.users.listFollowersForUser({
        username: this.username,
      });

      return response.data.map((follower) => follower.login);
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async followUser(username: string) {
    try {
      await this.octokit.users.follow({ username });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async unfollowUser(username: string) {
    try {
      await this.octokit.users.unfollow({ username });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }
}
