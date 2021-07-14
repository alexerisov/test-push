import CONFIG from '@/config.js';
import {AuthCookieStorage} from '@/utils/web-storage/cookie';

// eslint-disable-next-line max-len
const params = 'scrollbars=yes,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=500,height=600,left=-1000,top=-1000';
const USER_TYPE = {
  viewerType: 0,
  chefType: 1,
};

const openOAuth = (url, register, user_type) => {
  // TODO : add check for null of user_type
  const oauthWindow = window.open(url, 'auth', params);
  let timer = setInterval(function() {
    if (oauthWindow.closed) {
      clearInterval(timer);
      const {token} = AuthCookieStorage.auth;
      if (token) {
        window.location.replace(
            `${CONFIG.currentUrl}/oauth2-complete/${user_type}`);
      }
    }
  }, 1000);
};

/**
 * @param {number} userType
 * @param {boolean} register
 * @return {function(): Promise<void>}
 */
export const loginViaFacebook = (
    userType = USER_TYPE.viewerType, register = true) => {
  return async () => {
    openOAuth(
        `https://www.facebook.com/v10.0/dialog/oauth?scope=public_profile email&client_id=${CONFIG.fbClientId}&response_type=token&redirect_uri=${CONFIG.oauthRedirectUrl}&state=${JSON.stringify(
            {user_type: userType, register: register, backend: 'facebook'})}`,
        register, userType,
    );
  };
};

/**
 * @param {number} userType
 * @param {boolean} register
 * @return {function(): Promise<void>}
 */
export const loginViaGoogle = (
    userType = USER_TYPE.viewerType, register = true) => {
  return async () => {
    openOAuth(
        `https://accounts.google.com/o/oauth2/v2/auth?scope=openid email profile&client_id=${CONFIG.googleClientId}&response_type=token&redirect_uri=${CONFIG.oauthRedirectUrl}&state=${JSON.stringify(
            {
              user_type: userType,
              register: register,
              backend: 'google-oauth2',
            })}`,
        register, userType,
    );
  };
};

/**
 * @param {number} userType
 * @param {boolean} register
 * @return {function(): Promise<void>}
 */
export const loginViaInstagram = (
    userType = USER_TYPE.viewerType, register = true) => {
  return async () => {
    openOAuth(
        `https://api.instagram.com/oauth/authorize?scope=user_profile,user_media&response_type=code&client_id=${CONFIG.instagramClientId}&redirect_uri=${CONFIG.oauthRedirectUrl}&state=${JSON.stringify(
            {user_type: userType, backend: 'instagram'})}`,
        register, userType,
    );
  };
};
