import { create } from "zustand";

type GlobalLoading = {
  loading: boolean;
  delay: number;
  wait: number;
  loading2: boolean;
  delay2: number;
  wait2: number;
  setLoading: (value: boolean, delay: number, wait: number) => void;
  setLoading2: (value: boolean, delay: number, wait: number) => void;
};

export const useGlobalLoading = create<GlobalLoading>((set) => ({
  loading: false,
  delay: 0,
  wait: 0,
  loading2: false,
  delay2: 0,
  wait2: 0,
  setLoading: (value, delay, wait) => {
    if (value) {
      set({ loading: true });

      if (delay > 0) {
        setTimeout(() => {
          set({ loading: false });
        }, delay);
      } else {
        setTimeout(() => {
          set({ loading: false });
        }, wait);
      }
    } else {
      set({ loading: false });
    }
  },
  setLoading2: (value, delay2, wait2) => {
    if (value) {
      set({ loading2: true });

      if (delay2 > 0) {
        setTimeout(() => {
          set({ loading2: false });
        }, delay2);
      } else {
        setTimeout(() => {
          set({ loading2: false });
        }, wait2);
      }
    } else {
      set({ loading2: false });
    }
  },
}));
