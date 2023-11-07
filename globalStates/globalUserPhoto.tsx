// react components
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { StaticImageData } from "next/image";

// components
// import { useAuth } from "@/context/AuthContext";
import UserList from "@/components/global/topbar/UserList";

// assets
import defaultPhoto from "@/public/assets/default.png";
import prof_jefferson from "@/public/assets/prof_jefferson.png";
import prof_bookert from "@/public/assets/prof_bookert.png";
import prof_brown from "@/public/assets/prof_brown.png";
import admin_OnealAndrade from "@/public/assets/admin_OnealAndrade.png";
import student_brown from "@/public/assets/student_brown.png";
import student_carby from "@/public/assets/student_carby.png";

interface GlobalUserPhotoState {
  photo: StaticImageData | undefined;
  setDefaultPhoto: () => void;
}

// const { user } = useAuth();
let currentUser:
| {
    id: number;
    photo: StaticImageData | undefined;
    email: string;
    title: string;
    firstName: string;
    lastName: string;
  }
| undefined;

// if (user && user.email) {
//   const userList = UserList();
//   currentUser = userList.find((u: { email: any }) => u.email === user.email);
// }

export const globalUserPhoto = create<GlobalUserPhotoState>()(
  devtools(
    persist(
      (set) => ({
        photo: undefined,
        setDefaultPhoto: () => {
          set({ photo: defaultPhoto });
        },
      }),
      { name: "UserPhoto" }
    )
  )
);
