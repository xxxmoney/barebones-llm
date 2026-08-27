import { api } from './index';
import type { AxiosResponse } from 'axios';
import type { ModelDto } from '../dtos/openAi/model.dto.ts';

const URL_PREFIX = '/api/openai';

export const OpenAiApi = {
  getModels(): Promise<AxiosResponse<ModelDto[]>> {
    return api.get(`${URL_PREFIX}/models`);
  },
};
