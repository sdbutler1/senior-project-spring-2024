import { create } from "zustand";

type PopUpStore = {
  isPopUpOpen1: boolean;
  isPopUpOpen2: boolean;
  isPopUpOpen3: boolean;

  setPopUpOpen1: (value: boolean) => void;
  setPopUpOpen2: (value: boolean) => void;
  setPopUpOpen3: (value: boolean) => void;
};

const usePopUpStore = create<PopUpStore>((set) => ({
  isPopUpOpen1: false,
  isPopUpOpen2: false,
  isPopUpOpen3: false,

  setPopUpOpen1: (value) => set({ isPopUpOpen1: value }),
  setPopUpOpen2: (value) => set({ isPopUpOpen2: value }),
  setPopUpOpen3: (value) => set({ isPopUpOpen3: value }),
}));

export default usePopUpStore;
