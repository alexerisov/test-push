import Account from '@/api/Account.ts';
import { AuthCookieStorage } from '@/utils/web-storage/cookie';
import { recoveryLocalStorage } from '@/utils/web-storage/local';
import { types as cartTypes } from '../cart/actions';

export const types = {
  SAVE_SESSION: Symbol('SAVE_SESSION'),

  LOGOUT: Symbol('LOGOUT'),

  REMIND: Symbol('REMIND'),
  REMIND_SUCCESS: Symbol('REMIND_SUCCESS'),
  REMIND_FAILURE: Symbol('REMIND_FAILURE')
};

export default {
  /**
   * @param data {{
   *    token: string,
   *    refresh: string,
   * }}
   */
  saveSession: data => {
    return async dispatch => {
      const { token, refresh } = data;
      AuthCookieStorage.auth = { token, refresh };
      dispatch({ type: types.SAVE_SESSION, payload: data });
    };
  },

  logout: () => {
    return async dispatch => {
      AuthCookieStorage.reset();
      recoveryLocalStorage.deleteCreateRecipe();
      dispatch({ type: cartTypes.DELETE_CART });
      dispatch({ type: types.LOGOUT });
    };
  },

  remind: () => {
    return async dispatch => {
      dispatch({ type: types.REMIND });

      const { token, refresh } = AuthCookieStorage.auth;

      if (token && refresh) {
        try {
          const res = await Account.current();
          dispatch({
            type: types.REMIND_SUCCESS,
            payload: { profile: res.data, token, refresh }
          });
          return res;
        } catch (e) {
          if (e.response && e.response.status < 500) {
            dispatch({ type: types.REMIND_FAILURE, error: e.response.data });
          }
          throw e;
        }
      } else {
        dispatch({
          type: types.REMIND_FAILURE,
          error: { message: 'Not found token in localStorage' }
        });
      }
    };
  },

  refreshToken: () => {
    return async dispatch => {
      dispatch({ type: types.REMIND });

      const { refresh } = AuthCookieStorage.auth;

      if (refresh) {
        const res = await Account.refreshToken(refresh);
        const token = res.data.access;
        const data = {
          token: token,
          refresh: refresh
        };
        AuthCookieStorage.auth = { token, refresh };
        dispatch({ type: types.SAVE_SESSION, payload: data });
      }
    };
  }
};
