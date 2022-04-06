import type { AxiosResponse } from 'axios';
import type { ChefProfile, ViewerProfile } from '~types/profile';

import http from '../utils/http';

interface IAccountApi {
  login(email: string, password: string): Promise<AxiosResponse<any>>;
  socialLogin(socialLoginData: {
    access_token: string;
    code: string;
    account_type: string;
    backend: string;
    register: string;
    redirect_uri: string;
  }): Promise<AxiosResponse<any>>;
  current(): Promise<AxiosResponse<any>>;
  current(token: string | null): Promise<AxiosResponse<any>>;
  getNotifications(): Promise<AxiosResponse<any>>;
  deleteNotification(id: number): Promise<AxiosResponse<any>>;
  refreshToken(refreshToken: string): Promise<AxiosResponse<any>>;
  register(registerData: {
    email: ViewerProfile['email'];
    full_name: ViewerProfile['full_name'];
    password: string;
    user_type: ViewerProfile['user_type'];
  }): Promise<AxiosResponse<any>>;
  updateProfileUser(mainData: ViewerProfile, avatar: ViewerProfile['avatar']): Promise<AxiosResponse<any>>;
  updateAccountType(
    mainData: ChefProfile,
    avatar: ChefProfile['avatar'],
    role_model_images: ChefProfile['role_models']
  ): Promise<AxiosResponse<any>>;
  updateAccountChef(
    mainData: ChefProfile & { role_models_to_delete: ChefProfile['role_models'] },
    avatar: ChefProfile['avatar'],
    role_model_images: ChefProfile['role_models']
  ): Promise<AxiosResponse<any>>;
  resetPassword(email: string): Promise<AxiosResponse<any>>;
  resetPasswordCheckCode(data: { code: string }): Promise<AxiosResponse<any>>;
  resetPasswordSetNew(data: { code: string; password: string }): Promise<AxiosResponse<any>>;
  confirmEmail(code: string): Promise<AxiosResponse<any>>;
  sendConfirmEmail(): Promise<AxiosResponse<any>>;
  changePassword(password: string, new_password: string): Promise<AxiosResponse<any>>;
  getTargetChefAccountInfo(id: number): Promise<AxiosResponse<any>>;
}

const AccountApi: IAccountApi = {
  login: (email, password) => {
    return http.post(`token/`, { email, password });
  },

  socialLogin: ({ access_token, code, account_type, backend, register, redirect_uri }) => {
    return http.get(`token/social`, {
      params: { access_token, code, account_type, backend, register, redirect_uri }
    });
  },

  current: token => {
    if (token) {
      return http.get(`account/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return http.get(`account/me`);
  },

  getNotifications: () => {
    return http.get(`/notifications/`);
  },

  deleteNotification: id => {
    return http.delete(`/notifications/${id}/`);
  },

  refreshToken: refresh => {
    return http.post(`/token/refresh/`, {
      refresh: refresh
    });
  },

  register: ({ email, full_name, password, user_type }) => {
    return http.post(`account/register`, {
      email,
      full_name,
      password,
      user_type
    });
  },

  updateProfileUser: ({ city, full_name, phone_number, email, user_type, language }, avatar) => {
    const formData = new FormData();
    if (avatar instanceof File) {
      formData.append('avatar', avatar);
    }
    formData.append(
      'data',
      JSON.stringify({
        city,
        full_name,
        phone_number,
        email,
        user_type,
        language
      })
    );
    return http.patch(`account/me`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  updateAccountType: (
    {
      city,
      full_name,
      bio,
      phone_number,
      email,
      user_type,
      role_models,
      language,
      experience,
      personal_cooking_mission,
      source_of_inspiration,
      cooking_philosophy
    },
    avatar,
    role_model_images
  ) => {
    const formData = new FormData();
    if (avatar instanceof File) {
      formData.append('avatar', avatar);
    }
    if (role_model_images.length !== 0) {
      role_model_images.forEach((image, index) => {
        formData.append(`role_model_images[${index}]`, image);
      });
    }
    formData.append(
      'data',
      JSON.stringify({
        city,
        full_name,
        bio,
        phone_number,
        email,
        user_type,
        language,
        experience,
        role_models,
        personal_cooking_mission,
        source_of_inspiration,
        cooking_philosophy
      })
    );
    return http.post(`account/homechef_request`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },

  updateAccountChef: (
    {
      city,
      full_name,
      bio,
      phone_number,
      email,
      user_type,
      language,
      role_models,
      experience,
      personal_cooking_mission,
      source_of_inspiration,
      cooking_philosophy,
      role_models_to_delete
    },
    avatar,
    role_model_images
  ) => {
    const formData = new FormData();
    if (avatar instanceof File) {
      formData.append('avatar', avatar);
    }
    if (role_model_images.length !== 0) {
      role_model_images.forEach((image, index) => {
        formData.append(`role_model_images[${index}]`, image);
      });
    }
    formData.append(
      'data',
      JSON.stringify({
        city,
        full_name,
        bio,
        phone_number,
        email,
        role_models,
        user_type,
        language,
        experience,
        personal_cooking_mission,
        source_of_inspiration,
        cooking_philosophy,
        role_models_to_delete
      })
    );
    return http.patch(`account/homechef_request`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },

  resetPassword: email => {
    return http.post(`account/password/reset`, {
      email
    });
  },

  resetPasswordCheckCode: ({ code }) => {
    return http.post(`account/password/reset/check`, {
      code
    });
  },

  resetPasswordSetNew: ({ code, password }) => {
    return http.post(`account/password/new`, {
      code,
      password
    });
  },

  confirmEmail: code => {
    return http.post(`/account/email/confirm`, {
      code
    });
  },

  sendConfirmEmail: () => {
    return http.post(`/account/send_confirm_email`);
  },

  changePassword: (password, new_password) => {
    return http.post(`/account/password/change`, { password, new_password });
  },

  getTargetChefAccountInfo: id => {
    return http.get(`/account/${id}`);
  }
};

export default AccountApi;
