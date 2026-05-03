import { api } from './index';

const URL_PREFIX = '/api/test';

export const TestApi = {
  testConnection() {
    return api.get(`${URL_PREFIX}/test`);
  },
  getSampleData() {
    return api.get(`${URL_PREFIX}/sample`);
  }
};
