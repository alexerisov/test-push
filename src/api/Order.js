import http from '../utils/http';

export default {
  getOrderList: lang => {
    return http.get(`/order/list`, { params: { lang } });
  },

  getOrder: id => {
    return http.get(`/order/${id}`, {});
  }
};
