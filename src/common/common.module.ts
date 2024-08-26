import { Module } from '@nestjs/common';

import { CommonService } from './common.service';
import { ConfigProviderModule } from './config-provider/config-provider.module';

@Module({
  providers: [CommonService],
  exports: [CommonService],
  imports: [ConfigProviderModule],
})
export class CommonModule {}
