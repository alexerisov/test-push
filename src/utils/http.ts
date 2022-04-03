import axios from 'axios';
import { getSession } from 'next-auth/react';
import CONFIG from '@/config';
import { getLogger } from 'loglevel';
const log = getLogger('axios');

const baseURL = process.env.SOME_API_URL || 'http://localhost:1337';

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
    log.error(error);
  }
);

export default http;
