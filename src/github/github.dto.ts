import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UsernameDto {
  @ApiProperty({ description: 'username', example: 'username' })
  @IsString()
  @IsNotEmpty()
  username: string;
}
