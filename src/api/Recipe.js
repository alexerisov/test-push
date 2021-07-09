import http from '../utils/http';

export default {

  getPinnedMeals: () => {
    return http.get(`/recipe/pinned_meals`);
  },
  
};
