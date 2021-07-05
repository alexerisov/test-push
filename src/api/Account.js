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
};
