"use client";

// react components
import React, { useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

// components
import { useAuth } from "@/context/AuthContext";

// global states
import { globalSideBar } from "@/globalStates/globalSideBar";
import usePopUpStore from "@/globalStates/globalPopUp";

// assets
import logo from "@/public/assets/shaw.png";

// Icons
import {
  HiOutlineUserCircle,
  HiMenu,
} from "react-icons/hi";
import { GoTriangleDown } from "react-icons/go";

type Props = {};

const Topbar = (props: Props) => {
  const currentPathname = usePathname();
  const { user } = useAuth();
  const { isSidebarOpen, isSidebarHidden, toggleSideBar, HideSideBar } =
    globalSideBar();
  const {
    isPopUpOpen1,
    setPopUpOpen1,
  } = usePopUpStore();

  const togglePopUp = (popupNumber: number) => {
    setPopUpOpen1(popupNumber === 1);
  };

  useEffect(() => {
    const closePopupsOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".topbarPopup") && !target.closest(".popup")) {
        setPopUpOpen1(false);
      }
    };
    document.addEventListener("click", closePopupsOnOutsideClick);
    return () => {
      document.removeEventListener("click", closePopupsOnOutsideClick);
    };
  }, [
    isPopUpOpen1,
    setPopUpOpen1,
  ]);

  if (currentPathname === "/login" || currentPathname === "/forgotPassword") {
    return null;
  }
  return (
    <div className="w-full flex items-center justify-between bg-[#fefefe]">
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
          <button className="absolute right-36 h-auto w-full flex items-center justify-end ">
            <GoTriangleDown
              className={`text-2xl text-[#7d1f2e] ${
                isPopUpOpen1 ? "flex" : "hidden"
              }`}
            />
          </button>
          <button className="flex flex-col items-center justify-center">
          <li className="h-full w-full flex items-center font-bold justify-center gap-2">
              <HiOutlineUserCircle className="text-[1.6rem] lg:text-[2rem] text-[#7d1f2e]" />
              {user ? user.email.split("@")[0] : undefined}
            </li>
          </button>
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
