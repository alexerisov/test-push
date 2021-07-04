import reducer from '../../utils/reducer';
import {types} from './actions.js';

const initState = {
  data: {
    email: '',
    phone_number: '',
    password: '',
    user_type: '',
    checkboxAcceptTerms: false,
  },
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

  [types.CLEAR]: (state) => {
    return {
      ...initState,
    };
  },

  [types.SEND_SUCCESS]: (state, action) => {
    return {
      ...state,
      data: {
        email: '',
        phone_number: '',
        password: '',
        user_type: ''
      },
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

  [types.CLEAR_FAILURE]: (state) => {
    return {
      ...state,
      error: null,
    };
  },

});
