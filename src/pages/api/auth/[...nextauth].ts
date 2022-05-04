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

async function refreshToken(token) {
  try {
    const response = await http.post('token/refresh', {
      refresh: refreshToken
    });

    const refreshedTokens = await response?.data;

    return {
      ...token,
      accessToken: refreshedTokens.access
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError'
    };
  }
}

export default NextAuth({
  debug: false,
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

        return response?.data;
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
            log.info({ account });
            const response = await http.get(`token/social`, {
              params: {
                access_token: access_token,
                backend: 'google-oauth2',
                register: isNewUser ?? true
              }
            });

            const tokens = response?.data;

            token = {
              ...token,
              accessToken: tokens?.access,
              refreshToken: tokens?.refresh
            };
            http.defaults.headers.common['Authorization'] = `Bearer ${tokens?.access}`;
            if (Date.now() < token.accessTokenExpires) {
              return token;
            }

            return refreshToken(token);
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
                register: isNewUser ?? true
              }
            });

            const tokens = response?.data;

            token = {
              ...token,
              accessToken: tokens?.access,
              refreshToken: tokens?.refresh
            };
            http.defaults.headers.common['Authorization'] = `Bearer ${tokens?.access}`;
            if (Date.now() < token.accessTokenExpires) {
              return token;
            }

            return refreshToken(token);
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
          http.defaults.headers.common['Authorization'] = `Bearer ${account.token.access}`;
          if (Date.now() < token.accessTokenExpires) {
            return token;
          }

          return refreshToken(token);
        }
      }
      return token;
    },
    async session({ session, user, token }) {
      http.defaults.headers.common['Authorization'] = `Bearer ${token?.accessToken}`;
      try {
        const access = token.accessToken as string;
        const response = await http.get(`account/me`, {
          headers: {
            Authorization: `Bearer ${access}`
          }
        });
        const { full_name, email, avatar, language, user_type, pk } = response?.data as UserResponseData;
        token.user_type = user_type;
        session.accessToken = access;
        session.user = { full_name, email, avatar, language, user_type, pk } as const;
        return session;
      } catch (error) {
        log.error('sessions error', error);
        return null;
      }
    }
  }
});
