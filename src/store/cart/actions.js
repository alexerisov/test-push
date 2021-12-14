import Cart from '@/api/Cart';
import Recipe from '@/api/Recipe';

export const types = {
  SET_CART: 'CART/SET_CART',

  GET_CART_REQUESTED: 'CART/GET_CART_REQUESTED',
  GET_CART_SUCCESS: 'CART/GET_CART_SUCCESS',
  GET_CART_FAILED: 'CART/GET_CART_FAILED',

  ADD_TO_CART_REQUESTED: 'CART/ADD_TO_CART_REQUESTED',
  ADD_TO_CART_SUCCESS: 'CART/ADD_TO_CART_SUCCESS',
  ADD_TO_CART_FAILED: 'CART/ADD_TO_CART_FAILED',

  REMOVE_FROM_CART_REQUESTED: 'CART/REMOVE_FROM_CART_REQUESTED',
  REMOVE_FROM_CART_SUCCESS: 'CART/REMOVE_FROM_CART_SUCCESS',
  REMOVE_FROM_CART_FAILED: 'CART/REMOVE_FROM_CART_FAILED',

  UPDATE_CART_ITEM_REQUESTED: 'CART/UPDATE_CART_ITEM_REQUESTED',
  UPDATE_CART_ITEM_SUCCESS: 'CART/UPDATE_CART_ITEM_SUCCESS',
  UPDATE_CART_ITEM_FAILED: 'CART/UPDATE_CART_ITEM_FAILED'
};

export const setCart = data => {
  return { type: types.SET_CART, payload: data };
};

export const getCart = () => {
  return async dispatch => {
    dispatch({ type: types.GET_CART_REQUESTED });

    try {
      const delivery = await Cart.getDeliveryPrice();
      const deliveryPrice = delivery.data.price;

      const response = await Cart.getProductList();
      const cartList = await response.data.results;
      const productsData = await Promise.all(
        cartList.map(async item => {
          let itemResponse = await Recipe.getRecipe(item.object_id);
          return { ...item, object: itemResponse.data };
        })
      );
      const productsSum = productsData?.reduce((acc, val) => acc + val.object.price * val?.count, 0);
      const total = (productsSum + deliveryPrice).toFixed(2);
      dispatch({ type: types.GET_CART_SUCCESS, payload: { productsData, total, deliveryPrice } });
    } catch (e) {
      console.error(e);
      dispatch({ type: types.GET_CART_FAILED, payload: e });
    }
  };
};

export const addToCart = itemId => {
  return async dispatch => {
    dispatch({ type: types.ADD_TO_CART_REQUESTED });

    try {
      const response = await Cart.addItem('recipe', itemId);
      dispatch({ type: types.ADD_TO_CART_SUCCESS });
      dispatch(getCart());
    } catch (e) {
      console.error(e);
      dispatch({ type: types.ADD_TO_CART_FAILED, payload: e });
    }
  };
};

export const removeFromCart = itemCartId => {
  return async dispatch => {
    dispatch({ type: types.REMOVE_FROM_CART_REQUESTED });

    try {
      const response = await Cart.deleteItem(itemCartId);
      dispatch({ type: types.REMOVE_FROM_CART_SUCCESS });
      dispatch(getCart());
    } catch (e) {
      console.error(e);
      dispatch({ type: types.REMOVE_FROM_CART_FAILED, payload: e });
    }
  };
};

export const updateCartItem = (itemCartId, newCount) => {
  return async dispatch => {
    dispatch({ type: types.UPDATE_CART_ITEM_REQUESTED });

    try {
      const response = await Cart.updateItem(itemCartId, newCount);

      dispatch({ type: types.UPDATE_CART_ITEM_SUCCESS, payload: response.data });
    } catch (e) {
      console.error(e);
      dispatch({ type: types.UPDATE_CART_ITEM_FAILED, payload: e });
    }
  };
};

export const clearCart = () => {
  return async dispatch => {
    try {
      const response = await Cart.getProductList();
      const cartList = await response.data.results;
      const productsData = await Promise.all(
        cartList.map(async item => {
          return await Cart.deleteItem(item.pk);
        })
      );
      dispatch(getCart());
    } catch (e) {
      console.error(e);
    }
  };
};

export const addManyToCart = itemIdArray => {
  return async dispatch => {
    dispatch({ type: types.ADD_TO_CART_REQUESTED });

    try {
      const productsData = await Promise.all(
        itemIdArray.map(async item => {
          return await Cart.addItem('recipe', item);
        })
      );
      dispatch({ type: types.ADD_TO_CART_SUCCESS });
      dispatch(getCart());
    } catch (e) {
      console.error(e);
      dispatch({ type: types.ADD_TO_CART_FAILED, payload: e });
    }
  };
};

export const retryOrder = order => {
  return async dispatch => {
    try {
      const orderProductsIds = order.products.map(el => el.pk);
      dispatch(clearCart());
      dispatch(addManyToCart(orderProductsIds));
    } catch (e) {
      console.error(e);
    }
  };
};
