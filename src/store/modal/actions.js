export const types = {
  OPEN: Symbol('OPEN'),
  CLOSE: Symbol('CLOSE'),
  SET_PROMISE: Symbol('SET_PROMISE'),
  REGISTER_STATUS: Symbol('REGISTER_STATUS')
};

export default {
  open: (name, params) => {
    return dispatch => {
      return new Promise(resolve => {
        dispatch({
          type: types.OPEN,
          payload: { name, params, resolve }
        });
      });
    };
  },

  close: result => {
    return async (dispatch, getState) => {
      const { modal } = getState();
      modal.resolve(result);
      dispatch({
        type: types.CLOSE,
        payload: { result }
      });
    };
  },
  registerStatus: status => {
    return dispatch => {
      dispatch({
        type: types.REGISTER_STATUS,
        payload: status
      });
    };
  }
};
