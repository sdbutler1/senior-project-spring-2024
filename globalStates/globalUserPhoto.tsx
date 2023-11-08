import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

type globalPhoto = {
  currentPhotoState: boolean;
  addPhotoState: boolean;
  noPhotoState: boolean;
  setCurrentPhoto: () => void;
  setAddPhoto: () => void;
  setNoPhoto: () => void;
};

const globalUserPhoto = create<globalPhoto>()(
  devtools(
    persist(
      (set) => ({
        currentPhotoState: true,
        addPhotoState: false,
        noPhotoState: false,
        setCurrentPhoto: () =>
          set({
            currentPhotoState: true,
            addPhotoState: false,
            noPhotoState: false,
          }),
        setAddPhoto: () =>
          set({
            addPhotoState: true,
            currentPhotoState: false,
            noPhotoState: false,
          }),
        setNoPhoto: () =>
          set({
            noPhotoState: true,
            addPhotoState: false,
            currentPhotoState: false,
          }),
      }),
      { name: "UserPhoto" }
    )
  )
);

export default globalUserPhoto;
