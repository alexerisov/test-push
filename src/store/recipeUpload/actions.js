import Recipe from '@/api/Recipe';

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

  uploadRecipe: data => {
    return async dispatch => {
      dispatch({ type: types.SEND });

      try {
        const response = await Recipe.upload({
          title: data?.title,
          cooking_time: data?.cooking_time,
          cuisines: data?.cuisines,
          cooking_skills: data?.cooking_skills,
          cooking_methods: data?.cooking_methods,
          diet_restrictions: data?.diet_restrictions,
          description: data?.description,
          video: data?.video,
          types: data?.types,
          // tags,
          language: data?.language,
          caption: data?.caption,
          ingredients: data?.ingredients,
          calories: data?.calories,
          proteins: data?.proteins,
          carbohydrates: data?.carbohydrates,
          fats: data?.fats,
          steps: data?.steps,
          publish_status: data?.publish_status,
          images_to_delete: data?.images_to_delete,
          main_image: data?.main_image,
          images: data?.images
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
