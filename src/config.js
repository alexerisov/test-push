import { isWindowExist } from '@/utils/isTypeOfWindow';

let currentUrl;

if (isWindowExist()) {
  currentUrl = `${location.protocol}//${location.hostname}${location.port ? `:${location.port}` : ''}`;
} else {
  currentUrl = `localhost`;
}

const CONFIG = {
  baseUrl: process.env.BASE_URL,
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  currentUrl,
  oauthRedirectUrl: `${currentUrl}/login/social/`,
  STRIPE_PUBLISH_KEY: process.env.STRIPE_PUBLISH_KEY
};

export default CONFIG;
