import reducer from '../../utils/reducer';
import { types } from './actions.js';

const initState = {
  isLoading: false,
  error: null
};

export default reducer(initState, {
  [types.SET_CART]: (state, action) => {
    return {
      ...state,
      cart: action.payload
    };
  },

  // GET CART

  [types.GET_CART_REQUESTED]: state => {
    return {
      ...state,
      isLoading: true
    };
  },

  [types.GET_CART_SUCCESS]: (state, action) => {
    return {
      ...state,
      cart: action.payload,
      isLoading: false
    };
  },

  [types.GET_CART_FAILED]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      isLoading: false
    };
  },

  // UPDATE CART

  [types.UPDATE_CART_ITEM_REQUESTED]: state => {
    return {
      ...state,
      isLoading: true
    };
  },

  [types.UPDATE_CART_ITEM_SUCCESS]: (state, action) => {
    const updatedItem = action.payload;
    const updatedCart = state.cart.map(el => (el.pk === updatedItem.pk ? { ...el, count: updatedItem.count } : el));

    return {
      ...state,
      cart: updatedCart,
      isLoading: true
    };
  },

  [types.UPDATE_CART_ITEM_FAILED]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      isLoading: false
    };
  },

  // REMOVE FROM CART

  [types.REMOVE_FROM_CART_REQUESTED]: state => {
    return {
      ...state,
      isLoading: true
    };
  },

  [types.REMOVE_FROM_CART_SUCCESS]: state => {
    return {
      ...state,
      isLoading: false
    };
  },

  [types.REMOVE_FROM_CART_FAILED]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      isLoading: false
    };
  }
});
