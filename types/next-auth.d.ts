// noinspection ES6UnusedImports
import NextAuth, { DefaultSession } from 'next-auth';
declare module 'next-auth' {
  interface User {
    full_name: string;
    email: string;
    avatar: string;
    language: string;
    user_type: number;
    pk: number;
    access: string;
    refresh: string;
  }

  interface Session extends DefaultSession {
    user: {
      full_name: string;
      email: string;
      avatar: string;
      language: string;
      user_type: number;
      pk: number;
    };
    accessToken?: string;
  }

  interface Account {
    token: {
      access: string;
      refresh: string;
    };
  }

  interface JWT {
    accessToken: string;
    refreshToken: string;
  }
}
