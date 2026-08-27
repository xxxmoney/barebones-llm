import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import type { ConfigurationDto, ConfigurationUpdateDto } from '../dtos/configuration/configuration.dto.ts';
import { ConfigurationApi } from '../api/configuration.api.ts';

interface ConfigurationStore {
  loading: boolean;
  hasLoaded: boolean;
  configuration?: ConfigurationDto;

  getConfiguration: () => Promise<ConfigurationDto>;
  updateConfiguration: (configurationUpdate: ConfigurationUpdateDto) => Promise<ConfigurationDto>;
}

export const useConfigurationStore = create(devtools(immer<ConfigurationStore>((set) => ({
  loading: true,
  hasLoaded: false,
  configuration: undefined,

  getConfiguration: async () => {
    try {
      set(state => {
        state.loading = true;
      });

      const response = await ConfigurationApi.getConfiguration();
      if (response.status !== 200) {
        throw new Error(`Failed to fetch configuration: '${response.statusText}'`);
      }

      set(state => {
        state.configuration = response.data;
        state.hasLoaded = true;
      });

      return response.data;
    } finally {
      set(state => {
        state.loading = false;
      });
    }
  },

  updateConfiguration: async (configurationUpdate: ConfigurationUpdateDto) => {
    try {
      set(state => {
        const configuration = state.configuration;
        if (!configuration) {
          throw new Error('Configuration not found');
        }

        Object.assign(configuration, configurationUpdate);

        state.loading = true;
      });

      const response = await ConfigurationApi.updateConfiguration(configurationUpdate);
      if (response.status !== 200) {
        throw new Error(`Failed to update configuration: '${response.statusText}'`);
      }

      return response.data;
    } finally {
      set(state => {
        state.loading = false;
      });
    }
  }
}))));
