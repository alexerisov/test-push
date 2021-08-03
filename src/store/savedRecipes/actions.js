import Recipe from '@/api/Recipe';

export const types = {
  SAVED_REQUEST_START: Symbol('SAVED_REQUEST_START'),
  SAVED_REQUEST_ERROR: Symbol('SAVED_REQUEST_ERROR'),
  SAVED_GET_SUCCESS: Symbol('SAVED_GET_SUCCESS'),
  SAVED_SEND_SUCCESS: Symbol('SAVED_SEND_SUCCESS'),
  SAVED_DEL_SUCCESS: Symbol('SAVED_DEL_SUCCESS')
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

  saveRecipe: ({recipeId}) => {
    return async dispatch => {
      try {
        const response = await Recipe.postSavedRecipe(recipeId);

        if (response.status === 201) {
          dispatch({ type: types.SAVED_SEND_SUCCESS, payload: response.data.recipe});
          return response.data.recipe;
        }
      } catch (e) {
        console.error(e);
        dispatch({ type: types.SAVED_REQUEST_ERROR, payload: e });
      }
    };
  },

  deleteFromSaved: ({recipeId, savedId}) => {
    return async dispatch => {
      try {
        const response = await Recipe.deleteSavedRecipe(savedId);

        if (response.status === 204) {
          dispatch({ type: types.SAVED_DEL_SUCCESS, payload: savedId });
        }
      } catch (e) {
        console.error(e);
        dispatch({ type: types.SAVED_REQUEST_ERROR, payload: e });
      }
    };
  }
};
