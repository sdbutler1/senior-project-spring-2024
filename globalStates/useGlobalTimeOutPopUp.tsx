import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface timePopup {
  showPopup: boolean;
  setShowPopup: (value: boolean) => void;
}

export const useGlobalTimeOutPopUp = create<timePopup>()(
  devtools(
    persist(
      (set) => ({
        showPopup: false,
        setShowPopup: (value) => set({ showPopup: value }),
      }),
      { name: "TimeOut PopUp" }
    )
  )
);
