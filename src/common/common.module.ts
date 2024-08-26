import { Module } from '@nestjs/common';

import { CommonService } from './common.service.js';
import { ConfigProviderModule } from './config-provider/config-provider.module.js';

@Module({
  providers: [CommonService],
  exports: [CommonService],
  imports: [ConfigProviderModule],
})
export class CommonModule {}
