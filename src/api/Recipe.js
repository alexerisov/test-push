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

  uploadComments: ({
    id,
    text
  }) => {
    return http.post(`recipe/${id}/comments`, {
      text
    });
  },

  uploadCommentsLikes: ({
    id,
    type
  }) => {
    if (type === 'dislike') {
      return http.post(
        `recipe/comment/${id}/like`,
        {},
        {params: {'dislike': 'Y'}});
    }

    return http.post(`recipe/comment/${id}/like`, {});
  },

  uploadLikesRecipe: (id) => {
    return http.post(`/recipe/${id}/like`);
  },
  
  getPinnedMeals: () => {
    return http.get(`/recipe/pinned_meals`);
  },

  getQueryResult: (search) => {
    return http.get(`/recipe/search_suggestions?search=${search}`);
  },

  getSearchResult: (search) => {
    return http.get(`/recipe${search}`);
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

  getComments: ({recipeId, page}) => {
    return http.get(
      `/recipe/${recipeId}/comments`,
      { params:
          {
            'page': `${page}`,
            'page_size': 4,
          }
      });
  }
};
