import http from '../utils/http';

export default {
  getOrderList: () => {
    return http.get(`/order/list`, {});
  },

  getOrder: id => {
    return http.get(`/order/${id}`, {});
  }
};
