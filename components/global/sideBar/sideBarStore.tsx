import { create } from 'zustand';

interface SidebarStore {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const useSidebarStore = create<SidebarStore>((set) => ({
  isSidebarOpen: true, // Initial value
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
}));

export default useSidebarStore;
