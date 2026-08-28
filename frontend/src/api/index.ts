import * as axios from 'axios';

export const API_BASE_URL = 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  validateStatus: () => true // Handle status codes manually in the response
});
