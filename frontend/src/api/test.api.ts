import { api } from './index';
import type {AxiosResponse} from 'axios';

const URL_PREFIX = '/api/test';

export const TestApi = {
  testConnection(): Promise<AxiosResponse> {
    return api.get(`${URL_PREFIX}/test`);
  },
  getSampleData(): Promise<AxiosResponse> {
    return api.get(`${URL_PREFIX}/sample`);
  }
};
