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
      ...action.payload
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
      products: action.payload.productsData,
      total: action.payload.total,
      deliveryPrice: action.payload.deliveryPrice,
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

    const updatedCart = state.products.map(el => (el.pk === updatedItem.pk ? { ...el, count: updatedItem.count } : el));
    const updatedSum = updatedCart?.reduce((acc, val) => acc + val.object.price * val?.count, 0);
    const updatedTotal = updatedSum + state.deliveryPrice;

    return {
      ...state,
      products: updatedCart,
      total: updatedTotal,
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
  },

  [types.DELETE_CART]: () => {
    return initState;
  }
});
