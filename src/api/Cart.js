import http from '../utils/http';

export default {
  getInfo: () => {
    return http.get(`cart/info`);
  },

  getProductList: token => {
    if (token && token !== '{"token":null,"refresh":null}') {
      return http.get(`/cart/product/list`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token).token}`
        }
      });
    }
    return http.get(`/cart/product/list`);
  },

  addItem: (itemType, id) => {
    return http.post(`/cart/product/add/${itemType}/${id}`, {});
  },

  deleteItem: id => {
    return http.delete(`/cart/product/${id}`);
  },

  updateItem: (id, count) => {
    return http.patch(`/cart/product/${id}`, {
      count
    });
  }
};
