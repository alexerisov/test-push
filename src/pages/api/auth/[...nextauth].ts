import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import http from '@/utils/http';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getLogger } from 'loglevel';
import NextAuth from 'next-auth';
const log = getLogger('next-auth');

interface UserResponseData {
  full_name: string;
  email: string;
  avatar: string;
  language: string;
  user_type: number;
  pk: number;
}

async function refreshAccessToken(token) {
  try {
    const response = await http.post(
      `token/refresh`,
      {
        refresh: token.refreshToken
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    return {
      ...token,
      accessToken: response?.data.access,
      expires: Date.now() + 24 * 60 * 60,
      refreshToken: token.refreshToken
    };
  } catch (error) {
    log.error(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError'
    };
  }
}

export default NextAuth({
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
      log.error({ code, metadata });
    },
    warn(code) {
      log.warn({ code });
    },
    debug(code, metadata) {
      log.debug({ code, metadata });
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const response = await http.post(`token/`, { email: credentials?.email, password: credentials?.password });

        return response.data;
      }
    })
  ],
  theme: {
    colorScheme: 'light'
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        if (account.provider === 'credentials') {
          account.token = { access: user.access, refresh: user.refresh };
        }
        return true;
      } else {
        return false;
      }
    },
    async jwt({ token, account, isNewUser }) {
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
          } catch (error) {
            return null;
          }
        }

        //FACEBOOK oauth flow
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
          } catch (error) {
            return null;
          }
        }

        // EMAIL and PASSWORD auth flow
        if (account.provider === 'credentials') {
          token = {
            ...token,
            accessToken: account.token.access,
            refreshToken: account.token.refresh
          };
        }
      }

      if (Date.now() > token.accessTokenExpires) {
        return refreshAccessToken(token);
      }

      http.defaults.headers.common['Authorization'] = `Bearer ${token.accessToken}`;
      return token;
    },
    async session({ session, user, token }) {
      http.defaults.headers.common['Authorization'] = `Bearer ${token?.accessToken}`;
      try {
        const access = token.accessToken;
        const response2 = await http.get(`account/me`, {
          headers: {
            Authorization: `Bearer ${access}`
          }
        });
        const { full_name, email, avatar, language, user_type, pk } = response2.data as UserResponseData;
        token.user_type = user_type;
        session.accessToken = access as string;
        session.user = { full_name, email, avatar, language, user_type, pk } as const;
        return session;
      } catch (error) {
        return null;
      }
    }
  },
  events: {
    session: message => log.debug('SESSION', message),
    signIn: message => log.debug('SIGNIN', message)
  }
});
