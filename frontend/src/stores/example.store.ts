import { create } from 'zustand';
import {immer} from 'zustand/middleware/immer';

interface ExampleStore {
  count: number;
  increment: () => void;
}

export const useExampleStore = create(immer<ExampleStore>((set) => ({
  count: 0,
  increment: () => set((state) => {
    state.count += 1;
  }),
})));
