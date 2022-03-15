import axios, { AxiosInstance } from 'axios';
import CONFIG from '../config.js';

interface ExtendedAxiosInstance extends AxiosInstance {
  init: (any) => Promise<void>;
}

const http = axios.create({
  baseURL: CONFIG.baseUrl
}) as ExtendedAxiosInstance;

http.init = async function (store): Promise<void> {
  let prevSessionId = store.getState().account.token;
  if (prevSessionId !== null) {
    this.defaults.headers.common['Authorization'] = `Bearer ${prevSessionId}`;
  }
  store.subscribe(() => {
    let newSessionId = store.getState().account.token;
    if (newSessionId !== prevSessionId) {
      if (newSessionId === null) {
        delete this.defaults.headers.common['Authorization'];
      } else {
        this.defaults.headers.common['Authorization'] = `Bearer ${newSessionId}`;
      }
      prevSessionId = newSessionId;
    }
  });
};

export default http;
