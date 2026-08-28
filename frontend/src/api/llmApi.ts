import { api } from './index';
import type { AxiosResponse } from 'axios';
import type { ModelDto } from '../dtos/llm/model.dto.ts';

const URL_PREFIX = '/api/llm';

export const LlmApi = {
  getModels(): Promise<AxiosResponse<ModelDto[]>> {
    return api.get(`${URL_PREFIX}/models`);
  },
};
