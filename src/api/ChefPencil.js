import http from '../utils/http';

export default {
  upload: ({ title, html_content, images, main_image, categories }) => {
    const formData = new FormData();

    if (images.length !== 0) {
      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }

    formData.append(
      'data',
      JSON.stringify({
        title,
        html_content,
        main_image,
        categories
      })
    );

    return http.post(`/chef_pencil/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  uploadComments: ({ id, text }) => {
    return http.post(`chef_pencil/${id}/comments`, {
      text
    });
  },

  uploadAttachment: image => {
    if (!image) {
      return;
    }

    const formData = new FormData();
    formData.append(`image`, image);

    return http.post('/chef_pencil/attachment', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  uploadCommentsLikes: ({ id, type }) => {
    if (type === 'dislike') {
      return http.post(`chef_pencil/comment/${id}/like`, { dislike: 'Y' });
    }

    return http.post(`chef_pencil/comment/${id}/like`, {});
  },

  uploadLikesPencil: id => {
    return http.post(`/chef_pencil/${id}/like`);
  },

  uploadRating: ({ value, id }) => {
    return http.post(`/chef_pencil/${id}/rate`, {
      rating: value
    });
  },
  postSavedPencil: id => {
    return http.post(`/chef_pencil/saved_chef_pencil_records/`, {
      chef_pencil_record: id
    });
  },
  deleteSavedPencil: id => {
    return http.delete(`/chef_pencil/saved_chef_pencil_records/${id}`);
  },
  getChefPencils: (query = '') => {
    return http.get(`/chef_pencil?${query}`);
  },

  getPencilSearchSuggestions: query => {
    return http.get(`/chef_pencil/search_suggestions?${query}`);
  },

  getTargetChefPencil: (id, token) => {
    if (token && token !== '{"token":null,"refresh":null}') {
      return http.get(`/chef_pencil/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token).token}`
        }
      });
    }
    return http.get(`/chef_pencil/${id}`);
  },

  getUploadPencils: (pageSize, page) => {
    return http.get(`/chef_pencil/my`, {
      params: {
        page: `${page}`,
        page_size: `${pageSize}`
      }
    });
  },

  getLatestPencils: () => {
    return http.get(`/chef_pencil/latest_chef_pencils`);
  },

  getComments: ({ recipeId, page }) => {
    return http.get(`/chef_pencil/${recipeId}/comments`, {
      params: {
        page: `${page}`,
        page_size: 4
      }
    });
  },

  deleteComment: id => {
    return http.delete(`chef_pencil/comment/${id}/delete`);
  },

  update: ({ title, html_content, images, id, main_image, images_to_delete }) => {
    const formData = new FormData();

    const newImages = images.filter(item => item instanceof File);
    const oldImages = images.filter(item => item?.url);

    if (newImages.length !== 0) {
      newImages.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }

    formData.append(
      'data',
      JSON.stringify({
        title,
        html_content,
        images_to_delete,
        main_image,
        images: oldImages
      })
    );

    return http.patch(`/chef_pencil/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  deletePencil: id => {
    return http.delete(`chef_pencil/${id}`);
  },
  getSavedPencils: query => {
    return http.get('/chef_pencil/saved_chef_pencil_records/', {
      params: query
    });
  },
  getCategories: () => {
    return http.get('/chef_pencil/categories');
  }
};
