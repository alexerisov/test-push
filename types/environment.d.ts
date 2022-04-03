declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'stage';
      PORT?: string;
      PWD: string;
      FACEBOOK_CLIENT_ID: string;
      FACEBOOK_CLIENT_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      BASE_URL: string;
      DEBUG: boolean;
    }
  }
}

export {};
