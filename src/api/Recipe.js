import http from '../utils/http';

export default {
  upload: ({
    title,
    cooking_time,
    cuisines,
    cooking_skills,
    cooking_methods,
    diet_restrictions,
    description,
    video,
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
    main_image,
    images
  }) => {
    const formData = new FormData();
    formData.append(
      'data',
      JSON.stringify({
        title,
        cooking_time,
        cuisines,
        cooking_skills,
        cooking_methods,
        diet_restrictions,
        description,
        video,
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
        main_image,
        images
      })
    );
    return http.post(`recipe/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  uploadVideoRecipe: (video, setProgressVideo) => {
    const formData = new FormData();
    formData.append(`video`, video);
    return http.post(`/recipe/upload_video`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: data => {
        setProgressVideo(Math.round((100 * data.loaded) / data.total));
      }
    });
  },

  uploadImageRecipe: image => {
    const formData = new FormData();
    formData.append(`file`, image);
    return http.post('recipe/upload_image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  getRecipeVideoByID: id => {
    return http.get(`/recipe/video/${id}`);
  },

  uploadComments: ({ id, text }) => {
    return http.post(`recipe/${id}/comments`, {
      text
    });
  },

  uploadCommentsLikes: ({ id, type }) => {
    if (type === 'dislike') {
      return http.post(`recipe/comment/${id}/like`, {}, { params: { dislike: 'Y' } });
    }

    return http.post(`recipe/comment/${id}/like`, {});
  },

  uploadLikesRecipe: id => {
    return http.post(`/recipe/${id}/like`);
  },

  uploadShareStatsForRecipe: recipeId => {
    return http.post(`/stats/increment`, {
      key: 'SHARES_COUNTER',
      content_type: 'recipe',
      object_id: recipeId
    });
  },

  getPinnedMeals: () => {
    return http.get(`/recipe/pinned_meals`);
  },

  getQueryResult: (search, isEatChefOnly = false) => {
    const eatchefOnlyParams = !isEatChefOnly ? '' : '&only_eatchefs_recipes=Y';
    return http.get(`/recipe/search_suggestions?search=${search}${eatchefOnlyParams}`);
  },

  getSearchResult: ({
    cooking_methods = null,
    cooking_skills = null,
    diet_restrictions = null,
    page = null,
    title = null,
    types = null,
    ordering = null,
    only_eatchefs_recipes = null
  }) => {
    const eatchefRecipesParams = !only_eatchefs_recipes ? {} : { only_eatchefs_recipes: 'Y' };

    return http.get(`/recipe`, {
      params: {
        cooking_methods,
        cooking_skills,
        diet_restrictions,
        page,
        title,
        types,
        ordering,
        ...eatchefRecipesParams
      }
    });
  },

  getTopRatedMeals: () => {
    return http.get(`/recipe/top_rated_meals`);
  },

  getWeekmenu: () => {
    return http.get(`/settings/weekmenus`);
  },

  getFavoriteCuisines: id => {
    return http.get(`/recipe/favorite_cuisines?cuisine=${id}`);
  },

  // Get banners for homepage carousel
  getHomepageCarouselItems: () => {
    return http.get(`/recipe/homepage_banners`);
  },

  getMealOfWeek: token => {
    if (token && token !== '{"token":null,"refresh":null}') {
      return http.get(`/recipe/meal_of_the_week`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token).token}`
        }
      });
    }
    return http.get(`/recipe/meal_of_the_week`);
  },

  getRecipe: (id, token) => {
    if (token && token !== '{"token":null,"refresh":null}') {
      return http.get(`/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token).token}`
        }
      });
    }
    return http.get(`/recipe/${id}`);
  },

  getUploadRecipes: (pageSize, page) => {
    return http.get(`/recipe/my`, {
      params: {
        page: `${page}`,
        page_size: `${pageSize}`
      }
    });
  },

  getUploadRecipesForTargetUser: ({ query, id }) => {
    return http.get(`/recipe/user/${id}`, {
      params: query
    });
  },

  getComments: ({ recipeId, page }) => {
    return http.get(`/recipe/${recipeId}/comments`, {
      params: {
        page: `${page}`,
        page_size: 4
      }
    });
  },

  deleteComment: id => {
    return http.delete(`recipe/comment/${id}/delete`);
  },

  deleteRecipe: id => {
    return http.delete(`/recipe/${id}`);
  },

  update: (
    {
      title,
      cooking_time,
      cuisines,
      cooking_skills,
      cooking_methods,
      diet_restrictions,
      description,
      video,
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
      images_to_delete,
      main_image,
      images
    },
    id
  ) => {
    const formData = new FormData();

    formData.append(
      'data',
      JSON.stringify({
        title,
        cooking_time,
        cuisines,
        cooking_skills,
        cooking_methods,
        diet_restrictions,
        description,
        video,
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
        images_to_delete,
        main_image,
        images
      })
    );

    return http.patch(`recipe/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  getPopularRecipes: () => {
    return http.get(`/recipe/popular_recipes`);
  },

  getLatestRecipes: () => {
    return http.get(`/recipe/latest_user_recipes`);
  },

  getFeaturedMeals: () => {
    return http.get(`/recipe/featured_meals`);
  },

  postSavedRecipe: id => {
    return http.post(`/recipe/saved_recipe/`, {
      recipe: id
    });
  },

  deleteSavedRecipe: id => {
    return http.delete(`/recipe/saved_recipe/${id}`);
  },

  getSavedRecipes: query => {
    return http.get('/recipe/saved_recipe', {
      params: query
    });
  }
};
