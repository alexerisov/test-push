import reducer from '../../utils/reducer';
import {types} from './actions.js';

const initState = {
  data: [],
  isLoading: false,
  error: null,
};

export default reducer(initState, {

  [types.SAVED_REQUEST_START]: (state) => {
    return {
      ...state,
      isLoading: true
    };
  },

  [types.SAVED_REQUEST_ERROR]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      isLoading: false
    };
  },

  [types.SAVED_GET_SUCCESS]: (state, action) => {
    return {
      ...state,
      data: action.payload,
      isLoading: false
    };
  },

  [types.SAVED_SEND_SUCCESS]: (state, action) => {
    return {
      ...state,
      data: [...state.data, action.payload],
      isLoading: false,
    };
  },

  [types.SAVED_DEL_SUCCESS]: (state, action) => {
    return {
      ...state,
      data: [...state.data.filter(recipe => recipe !== action.payload.pk)],
      isLoading: false
    };
  },
});
