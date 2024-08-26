import { Global, Module } from '@nestjs/common';

import * as configProviders from './config.provider.js';

const providerValues = Object.values(configProviders);

@Global()
@Module({
  providers: providerValues,
  exports: providerValues,
})
export class ConfigProviderModule {}
