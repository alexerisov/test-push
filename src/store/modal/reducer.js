import reducer from '../../utils/reducer';
import { types } from './actions.js';

const initState = {
  show: false,
  name: null,
  params: null,
  result: null,
  toRegister: false
};

export default reducer(initState, {
  [types.REGISTER_STATUS]: (state, action) => {
    return {
      ...state,
      toRegister: action.payload
    };
  },

  [types.OPEN]: (state, action) => {
    return {
      ...state,
      show: true,
      name: action.payload.name,
      params: action.payload.params,
      resolve: action.payload.resolve,
      result: null
    };
  },

  [types.CLOSE]: (state, action) => {
    if (state.name) {
      return {
        ...state,
        show: false,
        result: action.payload.result,
        resolve: null
      };
    } else {
      return state;
    }
  }
});
