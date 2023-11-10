import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface SideBarState {
  showPopup: boolean;
  setShowPopup: (value: boolean) => void;
}

export const useGlobalTimeOutPopUp = create<SideBarState>()(
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
