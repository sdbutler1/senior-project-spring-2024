"use client";

// react components
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image, { StaticImageData } from "next/image";

// global states
import usePopUpStore from "@/globalStates/globalPopUp";

// components
import { useAuth } from "@/context/AuthContext";

// assets
import { UserList } from "@/components/global/topbar/UserList";

// Icons
import { AiOutlineClose } from "react-icons/ai";
import { MdHelp, MdLogout, MdPrivacyTip } from "react-icons/md";
import { FaUserLock } from "react-icons/fa6";

type Props = {};

const userProfile = (props: Props) => {
  const { logout, user } = useAuth();
  const currentPathname = usePathname();
  const { isPopUpOpen1, isPopUpOpen2, setPopUpOpen1, setPopUpOpen2 } = usePopUpStore();
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
  const closePopUp = () => {
    setPopUpOpen1(false);
  };

  const toggleHelp = () => {
    setPopUpOpen2(true);
  };

  if (currentPathname === "/login" || currentPathname === "/forgotPassword") {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`popup h-auto w-[20rem] flex-col items-center justify-center text-black bg-[#fffefe] border rounded-2xl mr-8 ${
          isPopUpOpen1 ? "flex" : "hidden"
        }`}
      >
        <div className="h-auto w-full flex flex-col items-center justify-center gap-3 p-4">
          <div className="h-auto w-full flex items-center justify-between">
            <h1 className="text-lg text-[#7d1f2e] font-bold tracking-wider">
              User Acount
            </h1>
            <div className="flex items-center justify-center">
              <AiOutlineClose className="cursor-pointer" onClick={closePopUp} />
            </div>
          </div>
          {currentUser ? (
            <div className="h-auto w-full flex items-center justify-start gap-3">
              <Image
                src={currentUser.photo}
                alt={`${currentUser.firstName} ${currentUser.lastName}`}
                className="h-16 w-16"
              />
              <div className="flex flex-col items-start justify-start gap-1">
                <p className="text-[#7d1f2e] font-semibold">
                  {currentUser.title} {currentUser.firstName}{" "}
                  {currentUser.lastName}
                </p>
                <p className="text-xs text-[#7d1f2e] font-semibold">
                  Computer Science
                </p>
                <p className="text-xs text-[#7d1f2e] font-semibold">
                  Shaw University
                </p>
              </div>
            </div>
          ) : (
            <p className="w-full">User not found</p>
          )}
          <Link
            href={"/userProfile"}
            className={`popUpClick h-10 w-full ${
              currentUser ? "flex" : "hidden"
            } items-center justify-center text-[#7d1f2e] font-semibold border-2 border-[#7d1f2e] rounded-3xl`}
          >
            View Profile
          </Link>
        </div>
        <hr className="w-full" />
        <div className="h-auto w-full bg-[#7d1f2e] rounded-b-2xl">
          <hr className="w-full" />
          <div className="h-auto w-full flex flex-col items-end justify-center gap-4 my-4">
            <h1 className="h-auto w-[95%] text-[#fff] font-semibold tracking-wider">
              User Support
            </h1>
            <div className="h-auto w-full flex flex-col items-start justify-start gap-4">
              <Link
                href={"https://www.shawu.edu/Privacy_and_Usage_Policy2.aspx"}
                className="popUpClick h-auto w-full flex items-center justify-start gap-4 text-[15px] text-[#fff] px-4"
              >
                <MdPrivacyTip className="text-lg" />
                <div>Privacy Policy</div>
              </Link>
              <Link
                href={""}
                onClick={toggleHelp}
                className="popUpClick h-auto w-full flex items-center justify-start gap-4 text-[15px] text-[#fff] px-4"
              >
                <MdHelp className="text-lg"/>
                <div>Help</div>
              </Link>
              <Link
                href={"/forgotPassword"}
                className="popUpClick h-auto w-full flex items-center justify-start gap-4 text-[15px] text-[#fff] px-4"
              >
                <FaUserLock className="text-lg"/>
                <div>Reset Password</div>
              </Link>
            </div>
          </div>
          <hr className="w-full" />
          <div className="h-auto w-full flex items-center justify-start py-2 rounded-b-2xl">
            <Link
              href={"/login"}
              className="popUpClick h-8 w-full flex items-center justify-start gap-4 p-4 text-[15px] text-[#fff] font-medium"
            >
              <MdLogout className="text-lg"/>
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
    </div>
  );
};

export default userProfile;
