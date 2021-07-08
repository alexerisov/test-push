import http from '../utils/http';

export default {
  login: (email, password) => {
    return http.post(`token/`, { email, password });
  },

  socialLogin: ({ access_token, account_type, backend, register }) => {
    return http.get(
      `token/social`,
      {
        params: { access_token, account_type, backend, register },
      },
    );
  },

  current: () => {
    return http.get(`account/me`);
  },

  register: ({
    email,
    phone_number,
    password,
    user_type
  }) => {
    return http.post(`account/register`, {
      email,
      phone_number,
      password,
      user_type
    });
  },

  /**
   * Registration method for Booker account
   * @param email
   * @param full_name
   * @param phone_number
   * @param city
   */

  updateProfile: ({
    city,
    full_name,
    phone_number,
    email,
    user_type,
    avatar,
    language
  }) => {
    const formData = new FormData();
    if (avatar instanceof File) {
      formData.append('avatar', avatar);
    }
    formData.append('data', JSON.stringify({
      city,
      full_name,
      phone_number,
      email,
      user_type,
      language
    }));
    return http.patch(
      `account/me`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  },
  
};
