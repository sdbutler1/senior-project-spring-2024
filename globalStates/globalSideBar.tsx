import { create } from "zustand";

// Define your state shape and initial values
interface SideBarState {
  isSidebarOpen: boolean;
  isSidebarHidden: boolean;
  toggleSideBar: () => void;
  HideSideBar: () => void;
}

// Create your Zustand store
export const globalSideBar = create<SideBarState>((set) => ({
  isSidebarOpen: true,
  isSidebarHidden: true,
  toggleSideBar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  HideSideBar: () =>
    set((state) => ({ isSidebarHidden: !state.isSidebarHidden })),
}));
