import { api } from './index';
import type { AxiosResponse } from 'axios';
import type { ConfigurationDto, ConfigurationUpdateDto } from '../dtos/configuration/configuration.dto.ts';

const URL_PREFIX = '/api/configuration';

export const ConfigurationApi = {
  getConfiguration(): Promise<AxiosResponse<ConfigurationDto>> {
    return api.get(`${URL_PREFIX}/`);
  },
  updateConfiguration(configuration: ConfigurationUpdateDto): Promise<AxiosResponse<ConfigurationDto>> {
    return api.put(`${URL_PREFIX}/`, configuration);
  }
};
