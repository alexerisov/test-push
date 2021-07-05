import reducer from '../../utils/reducer';
import {types} from './actions.js';

const initState = {
  data: null,
  isLoading: false,
  error: null,
};

export default reducer(initState, {

  [types.UPDATE]: (state, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        ...action.payload,
      },
    };
  },

  [types.SEND]: (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  },

  [types.SEND_SUCCESS]: (state, action) => {
    return {
      ...state,
      isLoading: false,
    };
  },

  [types.SEND_FAILURE]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  },

});