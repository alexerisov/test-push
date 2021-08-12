import Recipe from '@/api/Recipe';

export const types = {
  UPDATE: Symbol('UPDATE'),
  UPDATE_ERROR: Symbol('UPDATE_ERROR'),
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

  updateError: (error) => {
    return dispatch => {
      dispatch({
        type: types.UPDATE_ERROR,
        payload: error,
      });
    };
  },

  updateRecipe: (data) => {
    return async dispatch => {
      dispatch({ type: types.SEND });
      try {
        const response = await Recipe.update(
          {
            title: data?.title,
            cooking_time: data?.cooking_time,
            cuisines: data?.cuisines,
            cooking_skills: data?.cooking_skills,
            cooking_methods: data?.cooking_methods,
            diet_restrictions: data?.diet_restrictions,
            description: data?.description,
            preview_thumbnail_url: data?.preview_thumbnail_url,
            preview_full_thumbnail_url: data?.preview_full_thumbnail_url,
            preview_mp4_url: data?.preview_mp4_url,
            preview_webm_url: data?.preview_webm_url,
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
          },
          data?.images ?? null,
          data.id
        );
        dispatch({ type: types.SEND_SUCCESS});
        return response.data;
      } catch (e) {
        dispatch({ type: types.SEND_FAILURE, error: e.response.data });
        throw e;
      }
    };
  },
};