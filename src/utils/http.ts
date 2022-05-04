import axios from 'axios';
import { getSession } from 'next-auth/react';
import CONFIG from '@/config';
import { getLogger } from 'loglevel';
const log = getLogger('axios');

const defaultOptions = {
  baseURL: CONFIG.baseUrl
};

const http = axios.create(defaultOptions);

http.interceptors.request.use(async request => {
  const session = await getSession();
  if (session) {
    request.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return request;
});

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    log.error({
      status: error.response?.status,
      message: error.response?.statusText,
      config: {
        url: error.response?.config?.url,
        method: error.response?.config?.method,
        data: error.response?.config?.data,
        headers: error.response?.config?.headers
      },
      data: error.response?.data
    });
  }
);

export default http;
