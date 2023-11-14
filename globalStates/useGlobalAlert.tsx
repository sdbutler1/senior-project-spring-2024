import { create } from "zustand";

type GlobalAlert = {
  isOpen: boolean;
  message: string;
  type: string;
  setTranslateAlert: (isOpen: boolean, message: string, type: string) => void;
};

export const useGlobalAlert = create<GlobalAlert>((set) => ({
  isOpen: false,
  message: "",
  type: "",
  setTranslateAlert: (isOpen, message, type) => {
    set({ isOpen, message, type });

    // Automatically close the alert after 3 seconds if it's open
    if (isOpen) {
      setTimeout(() => {
        set({ isOpen: false, message, type });
      }, 3000);
    }
  },
}));
