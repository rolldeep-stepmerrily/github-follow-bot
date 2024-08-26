import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { GithubService } from './github.service.js';
import { UsernameDto } from './github.dto.js';

@ApiTags('github')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @ApiOperation({ summary: '내 팔로워들 찾기' })
  @Get('followers')
  async findFollowers() {
    return this.githubService.findFollowers();
  }

  @ApiOperation({ summary: '팔로우' })
  @Post('follow')
  async followUser(@Body() { username }: UsernameDto) {
    return this.githubService.followUser(username);
  }

  @ApiOperation({ summary: '언팔로우' })
  @Post('unfollow')
  async unfollowUser(@Body() { username }: UsernameDto) {
    return this.githubService.unfollowUser(username);
  }
}
