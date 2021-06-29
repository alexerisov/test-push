import reducer from '../../utils/reducer';
import { types } from './actions.js';

const initState = {
  data: {},
  isLoading: false,
  error: null,
};

export default reducer(initState, {


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
      data: { ...action.payload },
      isLoading: false,
      error: null,
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
