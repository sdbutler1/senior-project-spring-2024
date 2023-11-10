import { create } from "zustand";

type globalPopUp = {
  isPopUpOpen1: boolean;
  isPopUpOpen2: boolean;
  setPopUpOpen1: (value: boolean) => void;
  setPopUpOpen2: (value: boolean) => void;
};

export const useglobalPopUp = create<globalPopUp>((set) => ({
  isPopUpOpen1: false,
  isPopUpOpen2: false,

  setPopUpOpen1: (value) => set({ isPopUpOpen1: value }),
  setPopUpOpen2: (value) => set({ isPopUpOpen2: value }),
}));
