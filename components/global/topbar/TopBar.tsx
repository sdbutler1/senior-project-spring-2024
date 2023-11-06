"use client";

// react components
import React, { useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

// components
import { useAuth } from "@/context/AuthContext";

// global states
import { globalSideBar } from "@/globalStates/globalSideBar";
import usePopUpStore from "@/globalStates/globalPopUp";

// assets
import logo from "@/public/assets/shaw.png";
import { UserList } from "@/components/global/topbar/UserList";

// Icons
import { HiMenu } from "react-icons/hi";
import { GoTriangleDown } from "react-icons/go";

type Props = {};

const Topbar = (props: Props) => {
  const currentPathname = usePathname();
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
  const { isSidebarOpen, isSidebarHidden, toggleSideBar, HideSideBar } =
    globalSideBar();
  const { isPopUpOpen1, setPopUpOpen1 } = usePopUpStore();

  if (user && user.email) {
    currentUser = UserList.find((u) => u.email === user.email);
  }

  const togglePopUp = (popupNumber: number) => {
    setPopUpOpen1(popupNumber === 1);
  };

  useEffect(() => {
    const closePopupsOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        (!target.closest(".topbarPopup") && !target.closest(".popup")) ||
        target.closest(".popUpClick")
      ) {
        setPopUpOpen1(false);
      }
    };
    document.addEventListener("click", closePopupsOnOutsideClick);
    return () => {
      document.removeEventListener("click", closePopupsOnOutsideClick);
    };
  }, [isPopUpOpen1, setPopUpOpen1]);

  if (currentPathname === "/login" || currentPathname === "/forgotPassword") {
    return null;
  }
  return (
    <div className="w-full flex items-center justify-between bg-[#fefefe] border-b border-slate-100">
      <Link
        href={"/"}
        className="h-20 w-64 flex items-center sm:justify-center px-2 cursor-pointer"
      >
        <Image
          src={logo}
          alt="logo"
          className="h-4/5 md:h-5/6 w-6/12 md:w-11/12 object-contain"
          priority
        />
      </Link>

      <div className="h-full w-auto flex items-center justify-end gap-4 lg:gap-10 pr-2 lg:pr-8">
        <button
          type="button"
          onClick={() => togglePopUp(1)}
          className="relative flex items-center justify-center"
        >
          {currentUser ? (
            <div className="flex items-center justify-center">
              <Image
                src={currentUser.photo}
                alt={`${currentUser.firstName} ${currentUser.lastName}`}
                className="h-12 w-12"
              />
              <div className="flex items-center justify-center gap-1">
                <p className=" font-semibold">
                  {currentUser.title} {currentUser.firstName}{" "}
                  {currentUser.lastName}
                </p>
                <GoTriangleDown
                  className="text-2xl text-[#7d1f2e] flex"
                />
              </div>
            </div>
          ) : (
            <p>User not found</p>
          )}
        </button>
        <div
          className={`cursor-pointer ${isSidebarOpen ? "hidden" : "flex"}`}
          onClick={() =>
            !isSidebarOpen && isSidebarHidden
              ? toggleSideBar()
              : !isSidebarOpen &&
                !isSidebarHidden &&
                (toggleSideBar(), HideSideBar())
          }
        >
          <li className="h-full w-full flex items-center justify-center">
            <HiMenu className="text-[1.5rem] lg:text-[2rem] text-[#7d1f2e]" />
          </li>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
