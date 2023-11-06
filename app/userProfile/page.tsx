"use client";

// react components
import React from "react";
import Image, { StaticImageData } from "next/image";

// assets
import { UserList } from "@/components/global/topbar/UserList";
import { useAuth } from "@/context/AuthContext";

// icons
import { MdModeEdit } from "react-icons/md";

type Props = {};

const Page = (props: Props) => {
  const { user } = useAuth();
  let currentUser:
    | {
        id: number;
        photo: StaticImageData;
        email: string;
        title: string;
        firstName: string;
        lastName: string;
      }
    | undefined;

  if (user && user.email) {
    currentUser = UserList.find((u) => u.email === user.email);
  }
  return (
    <div className="h-full w-full flex flex-col items-start justify-start">
      <div className="h-auto w-full flex flex-col items-center justify-center gap-4 -mb-4">
        <div className="h-auto w-full flex items-center justify-between text-xl font-semibold bg-[#fff] px-4 py-3 rounded-lg">
          <h1>Edit Profile</h1>
          {currentUser ? (
            <div className="flex items-center justify-center">
              <Image
                src={currentUser.photo}
                alt={`${currentUser.firstName} ${currentUser.lastName}`}
                className="h-12 w-12"
              />
            </div>
          ) : (
            <p>User not found</p>
          )}
        </div>
        <div className="h-auto w-full flex items-center justify-center">
          <div className="relative h-full w-full flex items-start justify-center">
            <div className="relative h-auto w-auto flex items-start">
              {currentUser ? (
                <Image
                  src={currentUser.photo}
                  alt={`${currentUser.firstName} ${currentUser.lastName}`}
                  className="h-28 w-28"
                />
              ) : (
                <p>User not found</p>
              )}
              <button className="absolute bottom-2 right-2 h-6 w-6 flex items-center justify-center text-[#fff] bg-[#7d1f2e] rounded-full">
                <MdModeEdit />
              </button>
            </div>
          </div>
          <ul className="h-auto w-48 flex flex-col items-start justify-center gap-2 text-lg font-semibold bg-[#fff] p-6">
            <li className="hover:text-[#000]">
              <a href="">About Us</a>
            </li>
            <li className="hover:text-[#000]">
              <a href="">Help</a>
            </li>
            <li className="hover:text-[#000]">
              <a href="">FAQ</a>
            </li>
            <li className="hover:text-[#000]">
              <a href="">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
      <form className="h-full w-3/6 flex flex-col items-center justify-start text-[15px] font-semibold">
        <div className="h-auto w-full flex items-center justify-center gap-10 p-2">
          <label className="h-auto w-full flex flex-col items-start justify-center">
            Title
            <input className="h-12 w-full flex flex-col items-center justify-center border rounded-md" />
          </label>
          <label className="h-auto w-full flex flex-col items-start justify-center">
            Full Name
            <input className="h-12 w-full flex flex-col items-center justify-center border rounded-md" />
          </label>
        </div>
        <label className="h-auto w-full flex flex-col items-start justify-center p-2">
          Email
          <input className="h-12 w-full flex flex-col items-center justify-center border rounded-md" />
        </label>
        <label className="h-auto w-full flex flex-col items-start justify-center p-2">
          Number
          <input className="h-12 w-full flex flex-col items-center justify-center border rounded-md" />
        </label>
        <label className="h-auto w-full flex flex-col items-start justify-center p-2">
          City
          <input className="h-12 w-full flex flex-col items-center justify-center border rounded-md" />
        </label>
        <div className="h-auto w-full flex items-center justify-center gap-10 p-2">
          <label className="h-auto w-full flex flex-col items-start justify-center">
            State
            <input className="h-12 w-full flex flex-col items-center justify-center border rounded-md" />
          </label>
          <label className="h-auto w-full flex flex-col items-start justify-center">
            Zip Code
            <input className="h-12 w-full flex flex-col items-center justify-center border rounded-md" />
          </label>
        </div>
        <label className="h-auto w-full flex flex-col items-start justify-center p-2">
          Country
          <input className="h-12 w-full flex flex-col items-center justify-center border rounded-md" />
        </label>
      </form>
      <div className="h-auto w-3/6 flex items-center justify-end gap-8 p-2">
        <button
          type="button"
          className="h-10 w-36 flex items-center justify-center font-semibold rounded hover:bg-[#fff]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="h-10 w-36 flex items-center justify-center text-[#fff] font-semibold bg-[#7d1f2e] rounded hover:bg-[#701b29]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Page;
