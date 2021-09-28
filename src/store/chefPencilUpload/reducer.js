import reducer from '../../utils/reducer';
import { types } from './actions.js';

const initState = {
  data: {
    title: '',
    html_content: '',
    attachments: null,
    image: null,
    category: []
  },
  isLoading: false,
  error: null
};

export default reducer(initState, {
  [types.UPDATE]: (state, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        ...action.payload
      }
    };
  },

  [types.UPDATE_ERROR]: (state, action) => {
    return {
      ...state,
      error: {
        ...state.error,
        ...action.payload
      }
    };
  },

  [types.SEND]: state => {
    return {
      ...state,
      isLoading: true,
      error: null
    };
  },

  [types.SEND_SUCCESS]: state => {
    return {
      ...state,
      isLoading: false,
      error: null
    };
  },

  [types.SEND_FAILURE]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  }
});
