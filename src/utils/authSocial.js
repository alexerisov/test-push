import CONFIG from '@/config.js';
import { AuthCookieStorage } from '@/utils/web-storage/cookie';

// eslint-disable-next-line max-len
const params =
  'scrollbars=yes,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=500,height=600,left=-1000,top=-1000';
const USER_TYPE = {
  viewerType: 0,
  chefType: 1
};

const openOAuth = (url, register, accountType) => {
  // TODO : add check for null of user_type
  try {
    window.location.href = url;
  } catch (e) {
    console.log(e);
  }
};

/**
 * @param {number} accountType
 * @param {boolean} register
 * @return {function(): Promise<void>}
 */
export const loginViaFacebook = (accountType = USER_TYPE.viewerType, register = true) => {
  return async () => {
    openOAuth(
      `https://www.facebook.com/v10.0/dialog/oauth?scope=public_profile email&client_id=${
        CONFIG.fbClientId
      }&response_type=token&redirect_uri=${CONFIG.oauthRedirectUrl}&state=${JSON.stringify({
        account_type: accountType,
        register: register,
        backend: 'facebook'
      })}`,
      register,
      accountType
    );
  };
};

/**
 * @param {number} accountType
 * @param {boolean} register
 * @return {function(): Promise<void>}
 */
export const loginViaGoogle = (accountType = USER_TYPE.viewerType, register = true) => {
  return async () => {
    openOAuth(
      `https://accounts.google.com/o/oauth2/v2/auth?scope=openid email profile&client_id=${
        CONFIG.googleClientId
      }&response_type=token&redirect_uri=${CONFIG.oauthRedirectUrl}&state=${JSON.stringify({
        account_type: accountType,
        register: register,
        backend: 'google-oauth2'
      })}`,
      register,
      accountType
    );
  };
};
