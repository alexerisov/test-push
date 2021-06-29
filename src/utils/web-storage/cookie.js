import { isWindowExist } from "../isTypeOfWindow";

/**
 *
 * @param {string} key
 * @param {string} value
 * @param {number} expireDays
 * @param {number} expireHours
 * @param {number} expireMinutes
 * @param {number} expireSeconds
 */
export function setCookie(
  key, value, expireDays = 7, expireHours, expireMinutes, expireSeconds) {
  let expireDate = new Date();
  if (expireDays) {
    expireDate.setDate(expireDate.getDate() + expireDays);
  }
  if (expireHours) {
    expireDate.setHours(expireDate.getHours() + expireHours);
  }
  if (expireMinutes) {
    expireDate.setMinutes(expireDate.getMinutes() + expireMinutes);
  }
  if (expireSeconds) {
    expireDate.setSeconds(expireDate.getSeconds() + expireSeconds);
  }
  if (isWindowExist()) {
    document.cookie = key + '=' + escape(value) +
      ';domain=' + window.location.hostname +
      ';path=/' +
      ';expires=' + expireDate.toUTCString();
  }
}

/**
 *
 * @param name
 */
export function deleteCookie(name) {
  setCookie(name, '', null, null, null, 1);
}

/**
 * @param name {string}
 * @returns {string, undefined}
 */
export function getCookieValue(name) {
  if (isWindowExist()) {
    const matches = document.cookie.match(new RegExp(
      `(?:^|; )${name.replace(/([.$?*|{}()[]\/+^])/g, '\\$1')}=([^;]*)`,
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
}

//auth cookie
export class AuthCookieStorage {

  static key = 'aucr';

  static default = {
    token: null,
    refresh: null,
  };

  /**
   * @returns {{
   *    token: string|null,
   *    refresh: string|null,
   * }}
   */
  static get auth() {
    const auth = getCookieValue(AuthCookieStorage.key);
    if (!auth) {
      return AuthCookieStorage.default;
    }
    return JSON.parse(auth);
  }

  /**
   * @param val {{
   *    token: string,
   *    refresh: string,
   * }}
   * @return void
   */
  static set auth(val) {
    setCookie(AuthCookieStorage.key, JSON.stringify(val));
  }

  static reset() {
    deleteCookie(AuthCookieStorage.key);
  }
}
