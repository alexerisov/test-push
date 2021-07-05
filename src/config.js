import { isWindowExist } from '@/utils/isTypeOfWindow';

let currentUrl;

if (isWindowExist()) {
  currentUrl = `${location.protocol}//${location.hostname}${(location.port
    ? `:${location.port}`
    : '')}`;
} else {
  currentUrl = `localhost`;
}

const CONFIG = {
  baseUrl: process.env.BASE_URL,
  fbClientId: process.env.fbClientId,
  googleClientId: process.env.googleClientId,
  instagramClientId: process.env.instagramClientId,
  currentUrl,
  oauthRedirectUrl: `${currentUrl} /token/social/ `,
  STRIPE_PUBLISH_KEY: process.env.STRIPE_PUBLISH_KEY,
};

export default CONFIG;
