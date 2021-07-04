import Account from '../../api/Account';

export const types = {
  UPDATE: Symbol('UPDATE'),
  SEND: Symbol('SEND'),
  CLEAR: Symbol('CLEAR'),
  SEND_SUCCESS: Symbol('SEND_SUCCESS'),
  SEND_FAILURE: Symbol('SEND_FAILURE'),
  CLEAR_FAILURE: Symbol('CLEAR_FAILURE'),
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

  register: (data) => {
    return async dispatch => {
      dispatch({ type: types.SEND });

      try {
        const response = await Account.register({
          email: data.email,
          phone_number: data.phone_number,
          password: data.password,
          user_type: data.user_type
        });
        dispatch({ type: types.SEND_SUCCESS, payload: response.data });
      } catch (e) {
        dispatch({ type: types.SEND_FAILURE, error: e.response.data });
        throw e;
      }
    };
  },

  clear: () => {
    return dispatch => {
      dispatch({
        type: types.CLEAR,
      });
    };
  },

};
