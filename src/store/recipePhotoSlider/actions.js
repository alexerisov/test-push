export const types = {
  SET_ITEMS: Symbol('SET_ITEMS'),
  SET_CURRENT_ITEM: Symbol('SET_CURRENT_ITEM')
};

export default {
  setItems: (recipe) => {
    return async (dispatch) => {
      dispatch({
        type: types.SET_ITEMS,
        payload: recipe
      });
    };
  },

  setCurrentItemIndex: (index) => {
    return async (dispatch) => {
      dispatch({
        type: types.SET_CURRENT_ITEM,
        payload: index
      });
    };
  }
};
