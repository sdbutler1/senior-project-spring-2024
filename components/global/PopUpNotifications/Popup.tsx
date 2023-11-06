"use client";

// react components
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// global states
import usePopUpStore from "@/globalStates/globalPopUp";

// components
import { useAuth } from "@/context/AuthContext";

// Icons
import { AiOutlineSetting, AiOutlineClose } from "react-icons/ai";
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaUserLock } from "react-icons/fa6";

type Props = {};

const Popup = (props: Props) => {
  const { logout } = useAuth();
  const currentPathname = usePathname();
  const {
    isPopUpOpen1,
    setPopUpOpen1,
  } = usePopUpStore();

  const closePopUp = () => {
    setPopUpOpen1(false);
  };

  if (currentPathname === "/login" || currentPathname === "/forgotPassword") {
    return null;
  }

  return (
    <div className="flex items-center justify-between">
      {/* User Menu */}
      <div
        className={`popup h-[28rem] w-[25rem] flex-col items-center justify-center text-black bg-[#fefefe] border rounded-2xl mr-8 ${
          isPopUpOpen1 ? "flex" : "hidden"
        }`}
      >
        <div className="h-[2.5rem] w-full flex items-center justify-between p-6">
          <h1 className=" font-bold tracking-wider">User Account</h1>
          <div className="flex items-center justify-center gap-4">
            <AiOutlineSetting className="cursor-pointer" />
            <AiOutlineClose className="cursor-pointer" onClick={closePopUp} />
          </div>
        </div>
        <div className="h-1/6 w-full flex flex-col items-start justify-center"></div>

        <div className="h-5/6 w-full flex flex-col items-start justify-center gap-2">
          <Link
            href={"/dashboard"}
            className="h-8 w-full flex items-center justify-start gap-4 p-4"
          >
            <MdDashboard />
            <div>Dashboard</div>
          </Link>
          <Link
            href={"/forgotPassword"}
            className="h-8 w-full flex items-center justify-start gap-4 p-4"
          >
            <FaUserLock />
            <div>Reset Password</div>
          </Link>
          <Link
            href={"/login"}
            className="h-8 w-full flex items-center justify-start gap-4 p-4"
          >
            <MdLogout />
            <button
              type="button"
              onClick={() => {
                logout();
              }}
            >
              Sign Out
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Popup;
