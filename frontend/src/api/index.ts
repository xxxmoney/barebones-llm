import * as axios from 'axios';

export const API_BASE_URL = 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  validateStatus: (status: number) => (status >= 200 && status < 300) || (status >= 400 && status < 500),
});
