import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { GithubService } from './github.service.js';

@ApiTags('github')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @ApiOperation({ summary: 'Find followers' })
  @Get('followers')
  async findFollowers() {
    return this.githubService.findFollowers();
  }
}
