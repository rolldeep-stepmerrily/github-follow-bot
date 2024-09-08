declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    PORT: number;
    GITHUB_TOKEN: string;
    GITHUB_USERNAME: string;
    EXCEPTIONAL_FOLLOWINGS: string;
  }
}
