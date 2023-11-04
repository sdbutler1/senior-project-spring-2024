import { create } from "zustand";

type globalPopUp = {
  isPopUpOpen1: boolean;
  isPopUpOpen2: boolean;
  isPopUpOpen3: boolean;

  setPopUpOpen1: (value: boolean) => void;
  setPopUpOpen2: (value: boolean) => void;
  setPopUpOpen3: (value: boolean) => void;
};

const globalPopUp = create<globalPopUp>((set) => ({
  isPopUpOpen1: false,
  isPopUpOpen2: false,
  isPopUpOpen3: false,

  setPopUpOpen1: (value) => set({ isPopUpOpen1: value }),
  setPopUpOpen2: (value) => set({ isPopUpOpen2: value }),
  setPopUpOpen3: (value) => set({ isPopUpOpen3: value }),
}));

export default globalPopUp;
