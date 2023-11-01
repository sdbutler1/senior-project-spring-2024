import { create } from "zustand";

// Define your state shape and initial values
interface SideBarState {
  isSidebarOpen: boolean;
  isSidebarHidden: boolean;
  toggleSideBar: () => void;
  HideSideBar: () => void;
}

export const globalSideBar = create<SideBarState>((set, get) => {
  // Check if `localStorage` is available on the client-side
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  // Initialize state based on `localStorage` only if available
  const initialState = {
    isSidebarOpen:
      isLocalStorageAvailable &&
      localStorage.getItem("isSidebarOpen") === "true"
        ? true
        : false,
    isSidebarHidden:
      isLocalStorageAvailable &&
      localStorage.getItem("isSidebarHidden") === "true"
        ? true
        : false,
  };

  return {
    ...initialState,
    toggleSideBar: () => {
      set((state) => {
        const newIsSidebarOpen = !state.isSidebarOpen;
        // Update `localStorage` only if available
        if (isLocalStorageAvailable) {
          localStorage.setItem("isSidebarOpen", newIsSidebarOpen.toString());
        }
        return {
          isSidebarOpen: newIsSidebarOpen,
          isSidebarHidden: state.isSidebarHidden,
        };
      });
    },
    HideSideBar: () => {
      set((state) => {
        const newIsSidebarHidden = !state.isSidebarHidden;
        // Update `localStorage` only if available
        if (isLocalStorageAvailable) {
          localStorage.setItem(
            "isSidebarHidden",
            newIsSidebarHidden.toString()
          );
        }
        return {
          isSidebarHidden: newIsSidebarHidden,
          isSidebarOpen: state.isSidebarOpen,
        };
      });
    },
  };
});
