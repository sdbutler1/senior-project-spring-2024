"use client";

// react components
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

// global states
import { useglobalPopUp } from "@/globalStates/useglobalPopUp";
import { useGlobalLoading } from "@/globalStates/useGlobalLoading";

// components
import { useAuth } from "@/context/AuthContext";
import CurrentUser from "@/components/global/CurrentUser";

// assets

// Icons
import { AiOutlineClose } from "react-icons/ai";
import { MdHelp, MdLogout, MdPrivacyTip } from "react-icons/md";
import { FaUserLock } from "react-icons/fa6";
import { BiSolidUserDetail } from "react-icons/bi";

type Props = {};

const UserAccount = (props: Props) => {
  const { logout, user } = useAuth();
  const { setLoading } = useGlobalLoading();
  const currentPathname = usePathname();
  const currentUser = CurrentUser({});
  const { isPopUpOpen1, setPopUpOpen1, setPopUpOpen2 } = useglobalPopUp();
  const { setLoading2 } = useGlobalLoading();
  const userPhotoUrl =
    "https://firebasestorage.googleapis.com/v0/b/com-sci-dep-auth-project.appspot.com/o/default.png?alt=media&token=bafe0340-24ec-4083-ba7d-5bd6e3319d02";

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
              <AiOutlineClose
                className="cursor-pointer"
                onClick={() => setPopUpOpen1(false)}
              />
            </div>
          </div>
          {currentUser && user ? (
            <div className="h-auto w-full flex items-center justify-start gap-3">
              <Image
                src={user.photoURL ? user.photoURL : userPhotoUrl}
                width={50}
                height={50}
                alt={`${currentUser.firstName} ${currentUser.lastName}`}
                className="h-16 w-16 rounded-full"
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
            onClick={() => setLoading(true, 0, 500)}
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
                <MdPrivacyTip className="text-xl" />
                <div>Privacy Policy</div>
              </Link>
              <button
                onClick={toggleHelp}
                className="popUpClick h-auto w-full flex items-center justify-start gap-4 text-[15px] text-[#fff] px-4"
              >
                <MdHelp className="text-xl" />
                <div>Help</div>
              </button>
              <Link
                href={"/forgotPassword"}
                className="popUpClick h-auto w-full flex items-center justify-start gap-4 text-[15px] text-[#fff] px-4"
              >
                <FaUserLock className="text-[1rem]" />
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
              <MdLogout className="text-lg" />
              <button
                type="button"
                onClick={() => {
                  setPopUpOpen1(false);
                  setLoading2(true, 0, 1000);
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

export default UserAccount;
