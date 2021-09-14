import ChefPencil from '@/api/ChefPencil';

export const types = {
  UPDATE: Symbol('UPDATE'),
  UPDATE_ERROR: Symbol('UPDATE_ERROR'),
  SEND: Symbol('SEND'),
  SEND_SUCCESS: Symbol('SEND_SUCCESS'),
  SEND_FAILURE: Symbol('SEND_FAILURE')
};

export default {
  update: data => {
    return dispatch => {
      dispatch({
        type: types.UPDATE,
        payload: data
      });
    };
  },

  updateError: error => {
    return dispatch => {
      dispatch({
        type: types.UPDATE_ERROR,
        payload: error
      });
    };
  },

  uploadChefPencilImage: image => {
    return async dispatch => {
      dispatch({ type: types.SEND });

      try {
        const response = await ChefPencil.uploadAttachment(image);
        dispatch({ type: types.SEND_SUCCESS });
        return response?.data;
      } catch (e) {
        dispatch({ type: types.SEND_FAILURE, error: e.response.data });
        throw e;
      }
    };
  },

  uploadChefPencil: data => {
    return async dispatch => {
      dispatch({ type: types.SEND });
      try {
        const response = await ChefPencil.upload({
          title: data?.title,
          html_content: data?.html_content,
          attachments: data?.attachments,
          image: data?.image
        });
        dispatch({ type: types.SEND_SUCCESS });
        return response.data;
      } catch (e) {
        dispatch({ type: types.SEND_FAILURE, error: e.response.data });
        throw e;
      }
    };
  },

  updateChefPencil: (data, id) => {
    return async dispatch => {
      dispatch({ type: types.SEND });
      try {
        const response = await ChefPencil.update({
          title: data?.title,
          html_content: data?.html_content,
          attachments: data?.attachments,
          image: data?.image,
          id
        });
        dispatch({ type: types.SEND_SUCCESS });
        return response.data;
      } catch (e) {
        dispatch({ type: types.SEND_FAILURE, error: e.response.data });
        throw e;
      }
    };
  }
};
