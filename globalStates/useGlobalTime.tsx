import { create } from "zustand";
import dayjs, { Dayjs } from "dayjs"; // Import the dayjs library and Dayjs type

interface SideBarState {
  date: Dayjs; // Use Dayjs type for the date property
  setDate: (value: Dayjs) => void;
}

export const useGlobalTime = create<SideBarState>((set) => ({
  date: dayjs(), // Initialize date with a Dayjs object
  setDate: (value) => set({ date: value }),
}));
