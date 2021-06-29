// import Api from '@/api/api';

export const types = {
  SEND: Symbol('SEND'),
  SEND_SUCCESS: Symbol('SEND_SUCCESS'),
  SEND_FAILURE: Symbol('SEND_FAILURE'),
};
export default {

  fetch: () => {
    return async dispatch => {
      dispatch({ type: types.SEND });
      try {
        // const response = await Api.fetch();
        // dispatch({ type: types.SEND_SUCCESS, payload: { token: response.data } });
        // return response;
      } catch (e) {
        dispatch({ type: types.SEND_FAILURE, error: e.response.data });
        throw e;
      }
    };
  },
};