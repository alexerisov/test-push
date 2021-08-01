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

  uploadShareStatsForRecipe: (recipeId) => {
    return http.post(`/stats/increment`, {
      "key": "SHARES_COUNTER",
      "content_type": "recipe",
      "object_id": recipeId
    });
  },
  
  getPinnedMeals: () => {
    return http.get(`/recipe/pinned_meals`);
  },

  getQueryResult: (search) => {
    return http.get(`/recipe/search_suggestions?search=${search}`);
  },

  getSearchResult: ({
    cooking_methods = null,
    cooking_skills = null,
    diet_restrictions = null,
    page = null,
    title = null,
    types = null,
  }) => {
    return http.get(`/recipe`, {
      params: {
        cooking_methods,
        cooking_skills,
        diet_restrictions,
        page,
        title,
        types,
      },
    });
  },

  getTopRatedMeals: () => {
    return http.get(`/recipe/top_rated_meals`);
  },

  getFavoriteCuisines: (id) => {
    return http.get(`/recipe/favorite_cuisines?cuisine=${id}`);
  },

  // Get banners for homepage carousel
  getHomepageCarouselItems: () => {
    return http.get(`/recipe/homepage_banners`);
  },

  getMealOfWeek: () => {
    return http.get(`/recipe/meal_of_the_week`);
  },

  getRecipe: (id) => {
    return http.get(`/recipe/${id}`);
  },

  getUploadRecipes: (pageSize, page) => {
    return http.get(`/recipe/my`,
      {
        params: {
          'page': `${page}`,
          'page_size': `${pageSize}`,
        }
      });
  },

  getUploadRecipesForTargetUser: ({query, id}) => {
    return http.get(`/recipe/user/${id}`,
      {
        params: query
      });
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
  },

  deleteRecipe: (id) => {
    return http.delete(`/recipe/${id}`);
  },

  
  update: ({
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
    publish_status,
    images_to_delete},
    images, id) => {
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
      publish_status,
      images_to_delete
    }));
    return http.patch(
      `recipe/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  },

  getPopularRecipes: () => {
    return http.get(`/recipe/popular_recipes`);
  },

  getLatestRecipes: (userId) => {
    return http.get(`/recipe/latest_user_recipes/${userId}`);
  },

  getFeaturedMeals: () => {
    return http.get(`/recipe/featured_meals`);
  },

  postSavedRecipe: (id) => {
    return http.post(`/recipe/saved_recipe/`, {
      "recipe": id
    });
  },
  
  deleteSavedRecipe: (id) => {
    return http.delete(`/recipe/saved_recipe/${id}`);
  },

  getSavedRecipes: (query) => {
    return http.get('/recipe/saved_recipe', {
      params: query
    });
  }
};
