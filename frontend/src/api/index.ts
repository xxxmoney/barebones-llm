import * as axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  timeout: 60000,
  validateStatus: () => true // Handle status codes manually in the response
});
