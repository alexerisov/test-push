import http from '../utils/http';

export default {
  getBlocks: () => {
    return http.get('/settings/blocks');
  }
};
