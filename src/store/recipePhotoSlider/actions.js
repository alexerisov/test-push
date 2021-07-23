export const types = {
  SET_START_PHOTO: Symbol('SET_START_PHOTO'),
  SET_PHOTOS: Symbol('SET_PHOTOS')
};

export default {
  setStartPhoto: (currentPhotoIndex) => {
    return dispatch => {
      dispatch({
        type: types.SET_START_PHOTO,
        payload: currentPhotoIndex
      });
    };
  },

  setPhotos: (recipe) => {
    return async (dispatch) => {
      dispatch({
        type: types.SET_PHOTOS,
        payload: recipe.images
      });
    };
  }
};
