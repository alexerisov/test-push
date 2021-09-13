import http from '../utils/http';

export default {
  upload: ({ title, html_content, image }) => {
    const formData = new FormData();

    if (image) {
      formData.append('image', image);
    }

    formData.append(
      'data',
      JSON.stringify({
        title,
        html_content
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

  uploadRating: ({ value, id }) => {
    return http.post(`/chef_pencil/${id}/rate`, {
      rating: value
    });
  },

  getChefPencils: (query = '') => {
    return http.get(`/chef_pencil?${query}`);
  },

  getPencilSearchSuggestions: (query) => {
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
    return http.get(`/chef-pencil/my`, {
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

  deleteComment: (id) => {
    return http.delete(`chef_pencil/comment/${id}/delete`);
  },

  update: ({ title, html_content, attachments }, id) => {
    return http.patch(`chef-pencil/${id}`, {
      title,
      html_content,
      attachments
    });
  }
};
