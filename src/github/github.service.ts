import { Inject, Injectable } from '@nestjs/common';
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
    const response = await this.octokit.users.listFollowersForUser({
      username: this.username,
    });

    const follwers = response.data.map((user) => user.login);

    return { follwers };
  }

  async followUser(username: string) {
    await this.octokit.users.follow({ username });
  }

  async unfollowUser(username: string) {
    await this.octokit.users.unfollow({ username });
  }
}
