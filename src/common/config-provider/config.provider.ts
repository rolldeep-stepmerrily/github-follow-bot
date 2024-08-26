import { ConfigService } from '@nestjs/config';

const createConfigProvider = <T>(key: string, type: 'string' | 'number' = 'string') => {
  return {
    provide: key,
    useFactory: (configService: ConfigService) => {
      const value = configService.getOrThrow<T>(key);
      return type === 'number' ? Number(value) : value;
    },
    inject: [ConfigService],
  };
};

export const NODE_ENV = createConfigProvider<string>('NODE_ENV');
export const PORT = createConfigProvider<number>('PORT', 'number');
export const GITHUB_TOKEN = createConfigProvider<string>('GITHUB_TOKEN');
export const GITHUB_USERNAME = createConfigProvider<string>('GITHUB_USERNAME');
