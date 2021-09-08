import http from '../utils/http';

export default {
  upload: ({ title, html_content, attachments, image }) => {
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
      return http.post(`chef-pencil/comment/${id}/like`, {}, { params: { dislike: 'Y' } });
    }

    return http.post(`chef-pencil/comment/${id}/like`, {});
  },

  getTargetChefPencil: (id, token) => {
    if (token && token !== '{"token":null,"refresh":null}') {
      return http.get(`/chef-pencil/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token).token}`
        }
      });
    }
    return http.get(`/chef-pencil/${id}`);
  },

  getComments: ({ recipeId, page }) => {
    return http.get(`/chef-pencil/${recipeId}/comments`, {
      params: {
        page: `${page}`,
        page_size: 4
      }
    });
  },

  update: ({ title, html_content, attachments }, id) => {
    return http.patch(`chef-pencil/${id}`, {
      title,
      html_content,
      attachments
    });
  }
};
