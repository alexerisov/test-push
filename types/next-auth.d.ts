import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      full_name: string;
      email: string;
      avatar: string;
      language: string;
      user_type: number;
    };
  }

  interface Account {
    token: {
      access: string;
      refresh: string;
    };
  }
}
