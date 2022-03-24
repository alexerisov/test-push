import axios from 'axios';
import { getSession } from 'next-auth/react';
import CONFIG from '@/config';

const baseURL = process.env.SOME_API_URL || 'http://localhost:1337';

const defaultOptions = {
  baseURL: CONFIG.baseUrl
};

const http = axios.create(defaultOptions);

http.interceptors.request.use(async request => {
  const session = await getSession();
  if (session) {
    request.headers.Authorization = `Bearer ${session.jwt}`;
  }
  return request;
});

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(`error`, error);
  }
);

export default http;
