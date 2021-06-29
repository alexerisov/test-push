import Account from '@/api/Account';
import { accountActions } from '@/store/actions';

export const types = {
  UPDATE: Symbol('UPDATE'),

  SEND: Symbol('SEND'),
  SEND_SUCCESS: Symbol('SEND_SUCCESS'),
  SEND_FAILURE: Symbol('SEND_FAILURE'),
};
export default {

  update: (data) => {
    return dispatch => {
      dispatch({
        type: types.UPDATE,
        payload: data,
      });
    };
  },

  login: ({ email, password }) => {
    return async dispatch => {
      dispatch({ type: types.SEND });
      try {
        const response = await Account.login(email, password);
        const { access, refresh } = response.data;
        const payload = { token: access, refresh };
        dispatch(accountActions.saveSession(payload));
        dispatch({ type: types.SEND_SUCCESS, payload: { token: access, payload } });
        return response;
      } catch (e) {
        dispatch({ type: types.SEND_FAILURE, error: e.response.data });
        throw e;
      }
    };
  },

  loginWithLink: (code) => {
    return async dispatch => {
      dispatch({ type: types.SEND });
      try {
        const response = await Account.confirmEmail(code);
        const { access, refresh } = response.data;
        const payload = { token: access, refresh };
        dispatch(accountActions.saveSession(payload));
        dispatch({ type: types.SEND_SUCCESS, payload: { token: access, payload } });
        return response;
      } catch (e) {
        dispatch({ type: types.SEND_FAILURE, error: e.response.data });
        throw e;
      }
    };
  }
};
