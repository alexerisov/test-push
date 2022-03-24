import NextAuth, { Awaitable, DefaultAccount, Session, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import http from '@/utils/http';
import CredentialsProvider from 'next-auth/providers/credentials';
import log from 'loglevel';
import { JWT } from 'next-auth/jwt';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

interface ExtendUser {
  full_name: string;
  email: string;
  avatar: string;
  language: string;
  user_type: number;
}

interface ExtendSession extends Session {
  user: ExtendUser;
}

interface ExtendSessionProps {
  session: ExtendSession;
  user: User;
  token: JWT;
}

namespace NextAuthUtils {
  export const refreshToken = async function (refreshToken) {
    try {
      const response = await http.post(
        // "http://localhost:8000/api/auth/token/refresh/",
        'token/refresh',
        {
          refresh: refreshToken
        }
      );

      const { access, refresh } = response.data;
      // still within this block, return true
      return [access, refresh];
    } catch {
      return [null, null];
    }
  };
}

export default NextAuth({
  // https://next-auth.js.org/configuration/providers/oauth
  // secret: process.env.SESSION_SECRET,
  debug: true,
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
    verifyRequest: '/',
    newUser: '/'
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60 // 24 hours
  },
  logger: {
    error(code, metadata) {
      log.error(code, metadata);
    },
    warn(code) {
      log.warn(code);
    },
    debug(code, metadata) {
      log.debug(code, metadata);
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.googleClientId,
      clientSecret: process.env.googleClientSecret
    }),
    FacebookProvider({
      clientId: process.env.fbClientId,
      clientSecret: process.env.fbClientSecret
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        const response = await http.post(`token/`, { email, password });

        return response.data;
      }
    })
  ],
  theme: {
    colorScheme: 'light'
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log('\n SignIn start:', user.pk);
      // console.log('\n SignIn start:', account);
      // console.log('\n SignIn start:', credentials);
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        if (account.provider === 'credentials') {
          const { access, refresh } = user;
          account.token = { access, refresh };
        }
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token, account, isNewUser }) {
      // console.log('\n JWT start:', account);
      // console.log('\n JWT start:', token);
      // console.log('\n JWT start:', isNewUser);
      if (account) {
        //GOOGLE oauth flow
        if (account?.provider === 'google') {
          const { access_token, idToken } = account;
          try {
            const response = await http.get(`token/social`, {
              params: {
                access_token: access_token,
                backend: 'google-oauth2',
                register: isNewUser
              }
            });

            const { access, refresh } = response.data;

            token = {
              ...token,
              accessToken: access,
              refreshToken: refresh
            };
            return token;
          } catch (error) {
            return null;
          }
        }

        //FACEBOOK oauthflow
        if (account?.provider === 'facebook') {
          const { access_token, idToken } = account;
          try {
            const response = await http.get(`token/social`, {
              params: {
                access_token: access_token,
                backend: 'facebook',
                register: isNewUser
              }
            });

            const { access, refresh } = response.data;

            token = {
              ...token,
              accessToken: access,
              refreshToken: refresh
            };
            return token;
          } catch (error) {
            return null;
          }
        }

        if (account.provider === 'credentials') {
          token = {
            ...token,
            accessToken: account.token.access,
            refreshToken: account.token.refresh
          };
          return token;
        }
      }
      // console.log('\n JWT end:', account);
      // console.log('\n JWT end:', token);
      return token;
    },
    async session({ session, user, token }) {
      // console.log('\n Session start:', user);
      // console.log('\n Session start:', session);
      // console.log('\n Session start:', token);
      try {
        const access = token.accessToken;
        const response2 = await http.get(`account/me`, {
          headers: {
            Authorization: `Bearer ${access}`
          }
        });
        await console.log('context', http.defaults.headers.common);
        const { full_name, email, avatar, language, user_type, pk } = response2.data;

        token.user_type = user_type;
        session.jwt = access;
        session.user = { full_name, email, avatar, language, user_type, pk } as const;

        return session;
      } catch (error) {
        // process.stdout.write(JSON.stringify(JSON.stringify(error, undefined, 2)));
        // console.dir(error);
        return null;
      }
    }
  }
});
