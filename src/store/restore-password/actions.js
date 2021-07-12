import Account from '../../api/Account';

export const types = {
  UPDATE: Symbol('UPDATE'),

  REQUEST: Symbol('REQUEST'),
  REQUEST_SUCCESS: Symbol('REQUEST_SUCCESS'),
  REQUEST_FAILURE: Symbol('REQUEST_FAILURE'),

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

  resetPassword: ({ email }) => {
    return async dispatch => {
      dispatch({ type: types.SEND });

      try {
        await Account.resetPassword(email);
        dispatch({ type: types.SEND_SUCCESS });
      } catch (e) {
        dispatch({ type: types.SEND_FAILURE, error: e.response.data });
        throw e;
      }
    };
  },

  checkResetCode: (code) => {
    return async dispatch => {
      dispatch({ type: types.SEND });
      try {
        const response = await Account.resetPasswordCheckCode({ code });
        dispatch({ type: types.SEND_SUCCESS });
      } catch (e) {
        dispatch({ type: types.SEND_FAILURE, error: e.response.data });
        throw e;
      }
    };
  },

  setNewPassword: ({ code, password, passwordConfirm }) => {
    return async dispatch => {
      dispatch({ type: types.SEND });
      if (password !== passwordConfirm) {
        const error = { passwordConfirm: ['Passwords not match'] };
        dispatch({ type: types.SEND_FAILURE, error });
        throw new Error(`passwordConfirm error ${JSON.stringify(error)}`);
      }
      try {
        const response = await Account.resetPasswordSetNew(
          { code, password });
        dispatch({ type: types.SEND_SUCCESS });
      } catch (e) {
        dispatch({ type: types.SEND_FAILURE, error: e.response.data });
        throw e;
      }
    };
  },

};
