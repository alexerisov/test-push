import Recipe from '@/api/Recipe';

export const types = {
  SAVED_REQUEST_START: Symbol('SAVED_REQUEST_START'),
  SAVED_REQUEST_ERROR: Symbol('SAVED_REQUEST_ERROR'),
  SAVED_GET_SUCCESS: Symbol('SAVED_GET_SUCCESS'),
};

export default {
  startSavedRecipesRequests: () => {
    return dispatch => {
      dispatch({
        type: types.SAVED_REQUEST_START,
        payload: true,
      });
    };
  },

  getSavedRecipes: (query) => {
    return async dispatch => {
      try {
        const response = await Recipe.getSavedRecipes(query);

        if (response.status === 200) {
          dispatch({ type: types.SAVED_GET_SUCCESS, payload: response.data});
        }
      } catch (e) {
        console.error(e);
        dispatch({ type: types.SAVED_REQUEST_ERROR, payload: e});
      }
    };
  },
};
