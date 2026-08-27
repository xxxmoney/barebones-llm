import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import type { ModelDto } from '../dtos/openAi/model.dto.ts';
import { OpenAiApi } from '../api/openAi.api.ts';

interface OpenAiStore {
    loading: boolean;
    hasLoaded: boolean;
    models: ModelDto[];

    getModels: () => Promise<ModelDto[]>;
}

export const useOpenAiStore = create(devtools(immer<OpenAiStore>((set) => ({
  loading: false,
  hasLoaded: false,
  models: [],

  getModels: async ()=> {
    try {
      set(state => {
        state.loading = true;
      });

      const response = await OpenAiApi.getModels();
      if (response.status !== 200) {
        throw new Error(`Failed to fetch models: '${response.statusText}'`);
      }

      set(state => {
        state.models = response.data;
        state.hasLoaded = true;
      });

      return response.data;
    } finally {
      set(state => {
        state.loading = false;
      });
    }
  }
}))));
