import http from '../utils/http';

export default {
  upload: ({
    title,
    cooking_time,
    cuisines,
    // cooking_skill,
    cooking_methods,
    diet_restrictions,
    description,
    preview_thumbnail_url,
    preview_full_thumbnail_url,
    preview_mp4_url,
    preview_webm_url,
    types,
    // tags,
    language,
    caption,
    ingredients,
    calories,
    proteins,
    carbohydrates,
    fats,
    steps,
    publish_status},
    images) => {
    const formData = new FormData();
    if (images.length !== 0) {
      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }
    formData.append('data', JSON.stringify({
      title,
      cooking_time,
      cuisines,
      // cooking_skill,
      cooking_methods,
      diet_restrictions,
      description,
      preview_thumbnail_url,
      preview_full_thumbnail_url,
      preview_mp4_url,
      preview_webm_url,
      types,
      // tags,
      language,
      caption,
      ingredients,
      calories,
      proteins,
      carbohydrates,
      fats,
      steps,
      publish_status
    }));
    return http.post(
      `recipe/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  },
  
  getPinnedMeals: () => {
    return http.get(`/recipe/pinned_meals`);
  },

  getQueryResult: (search) => {
    return http.get(`/recipe/search_suggestions?search=${search}`);
  },

  getSearchResult: (title) => {
    return http.get(`/recipe?title=${title}`);
  },

  getTopRatedMeals: () => {
    return http.get(`/recipe/top_rated_meals`);
  },

  getFavoriteCuisines: (id) => {
    return http.get(`/recipe/favorite_cuisines?cuisine=${id}`);
  },

  getHomepageBanners: () => {
    return http.get(`/recipe/homepage_banners`);
  },

  getMealOfWeek: () => {
    return http.get(`/recipe/meal_of_the_week`);
  },

  getRecipe: (id) => {
    return http.get(`/recipe/${id}`);
  },
};
