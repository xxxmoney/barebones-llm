import { create } from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {devtools} from 'zustand/middleware';

interface ExampleStore {
  count: number;
  increment: () => void;
}

export const useExampleStore = create(devtools(immer<ExampleStore>((set) => ({
  count: 0,
  increment: () => set((state) => {
    state.count += 1;
  }),
}))));
