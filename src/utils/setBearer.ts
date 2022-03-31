import http from '@/utils/http';

export function setBearer(token: any): void {
  if (token) {
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}
