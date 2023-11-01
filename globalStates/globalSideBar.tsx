import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
// Define your state shape and initial values
interface SideBarState {
  isSidebarOpen: boolean;
  isSidebarHidden: boolean;
  toggleSideBar: () => void;
  HideSideBar: () => void;
}

export const globalSideBar = create<SideBarState>()(
  devtools(
    persist(
      (set) => ({
        isSidebarOpen: true,
        isSidebarHidden: true,
        toggleSideBar: () =>
          set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
        HideSideBar: () =>
          set((state) => ({ isSidebarHidden: !state.isSidebarHidden })),
      }),
      { name: "SideBar" }
    )
  )
);
