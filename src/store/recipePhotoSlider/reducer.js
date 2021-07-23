import reducer from '../../utils/reducer';
import {types} from './actions.js';

const initState = {
  photos: [],
  currentPhotoIndex: null
};

export default reducer(initState, {
  [types.SET_START_PHOTO]: (state, action) => {
    return {
      ...state,
      currentPhotoIndex: action.payload
    };
  },

  [types.SET_PHOTOS]: (state, action) => {
    return {
      ...state,
      photos: [...action.payload]
    };
  }
});
