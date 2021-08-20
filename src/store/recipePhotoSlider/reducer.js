import reducer from '../../utils/reducer';
import {types} from './actions.js';

const initState = {
  items: [],
  currentItemIndex: 0
};

export default reducer(initState, {
  [types.SET_ITEMS]: (state, action) => {
    return {
      ...state,
      items: action.payload
    };
  },

  [types.SET_CURRENT_ITEM]: (state, action) => {
    return {
      ...state,
      currentItemIndex: action.payload
    };
  }
});
