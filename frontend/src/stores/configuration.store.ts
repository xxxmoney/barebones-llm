import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

interface ConfigurationStore {
  loading: boolean;
}

export const useConfigurationStore = create(devtools(immer<ConfigurationStore>((set) => ({
  loading: true,
}))));
