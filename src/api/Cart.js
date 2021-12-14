import http from '../utils/http';

export default {
  getInfo: () => {
    return http.get(`cart/info`);
  },

  getDeliveryPrice: () => {
    return http.get(`/order/delivery_price`);
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
  },

  postAddress: data => {
    return http.post(`/cart/address`, data);
  },

  getAddress: id => {
    return http.get(`/cart/address/${id}`);
  },

  postOrder: data => {
    return http.post(`/cart/order`, data);
  }
};
