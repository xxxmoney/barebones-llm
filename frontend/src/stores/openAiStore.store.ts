import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import type { ModelDto } from '../dtos/llm/model.dto.ts';
import { LlmApi } from '../api/llmApi.ts';

interface LlmStore {
    loading: boolean;
    hasLoaded: boolean;
    models: ModelDto[];

    getModels: () => Promise<ModelDto[]>;
}

export const useLlmStore = create(devtools(immer<LlmStore>((set) => ({
  loading: false,
  hasLoaded: false,
  models: [],

  getModels: async ()=> {
    try {
      set(state => {
        state.loading = true;
      });

      const response = await LlmApi.getModels();
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
