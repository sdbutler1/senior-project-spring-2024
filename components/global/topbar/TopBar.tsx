"use client";

// react components
import React, { useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

// components
import { useAuth } from "@/context/AuthContext";
import BubbleCount from "@/components/global/PopUpNotifications/BubbleCount";

// global states
import { globalSideBar } from "@/globalStates/globalSideBar";
import usePopUpStore from "@/globalStates/globalPopUp";

// assets
import logo from "@/public/assets/shaw.png";

// Icons
import {
  HiOutlineMail,
  HiOutlineBell,
  HiOutlineUserCircle,
  HiMenu,
  HiSearch,
} from "react-icons/hi";
import { GoTriangleDown } from "react-icons/go";
import { BsSearch } from "react-icons/bs";

type Props = {};

const Topbar = (props: Props) => {
  const currentPathname = usePathname();
  const { user } = useAuth();
  const { isSidebarOpen, isSidebarHidden, toggleSideBar, HideSideBar } =
    globalSideBar();
  const {
    isPopUpOpen1,
    isPopUpOpen2,
    isPopUpOpen3,
    setPopUpOpen1,
    setPopUpOpen2,
    setPopUpOpen3,
  } = usePopUpStore();

  const togglePopUp = (popupNumber: number) => {
    setPopUpOpen1(popupNumber === 1);
    setPopUpOpen2(popupNumber === 2);
    setPopUpOpen3(popupNumber === 3);
  };

  useEffect(() => {
    const closePopupsOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".topbarPopup") && !target.closest(".popup")) {
        setPopUpOpen1(false);
        setPopUpOpen2(false);
        setPopUpOpen3(false);
      }
    };
    document.addEventListener("click", closePopupsOnOutsideClick);
    return () => {
      document.removeEventListener("click", closePopupsOnOutsideClick);
    };
  }, [
    isPopUpOpen1,
    isPopUpOpen2,
    isPopUpOpen3,
    setPopUpOpen1,
    setPopUpOpen2,
    setPopUpOpen3,
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
      <form className="h-full w-3/6 invisible flex items-center justify-center">
        <label className="h-4/6 w-3/6 flex items-center justify-start text-lg px-8 gap-2 rounded-3xl border border-[#7d1f2f90]">
          <div className="h-full w-8 flex items-center justify-start text-xl text-[#7d1f2e]">
            <BsSearch />
          </div>
          <input
            type="text"
            id="search"
            name="search"
            autoComplete="off"
            placeholder="Search..."
            className="w-full bg-transparent outline-none focus:border-b border-slate-500 p-2"
          />
        </label>
      </form>
      <div className="h-full w-auto flex items-center justify-end gap-4 lg:gap-10 pr-2 lg:pr-8">
        <button
          type="button"
          className="relative flex items-center justify-center"
        >
          <div className="flex flex-col items-center justify-center">
            <li className="h-full w-full flex items-center justify-center">
              <HiSearch className="text-[1.6rem] lg:text-[2rem] text-[#7d1f2e]" />
            </li>
          </div>
        </button>
        <button
          type="button"
          onClick={() => togglePopUp(1)}
          className="relative flex items-center justify-center"
        >
          <button className="absolute right-[1.8rem] h-auto w-full flex items-center justify-end ">
            <GoTriangleDown
              className={`text-2xl text-[#7d1f2e] ${
                isPopUpOpen1 ? "flex" : "hidden"
              }`}
            />
          </button>
          <button className="flex flex-col items-center justify-center">
            <li className="h-full w-full flex items-center justify-center">
              <HiOutlineMail className="text-[1.6rem] lg:text-[2rem] text-[#7d1f2e]" />
              <BubbleCount popUpSection={"All"} topBarSection="Messages"/>
            </li>
          </button>
        </button>
        <button
          type="button"
          onClick={() => togglePopUp(2)}
          className="relative flex items-center justify-center"
        >
          <button className="absolute right-6 h-auto w-full flex items-center justify-end ">
            <GoTriangleDown
              className={`text-2xl text-[#7d1f2e] ${
                isPopUpOpen2 ? "flex" : "hidden"
              }`}
            />
          </button>
          <button className="flex flex-col items-center justify-center">
            <li className="h-full w-full flex items-center justify-center">
              <HiOutlineBell className="text-[1.6rem] lg:text-[1.9rem] text-[#7d1f2e]" />
              <BubbleCount popUpSection={"All"} topBarSection="Notifications"/>
            </li>
          </button>
        </button>

        <button
          type="button"
          onClick={() => togglePopUp(3)}
          className="relative flex items-center justify-center"
        >
          <button className="absolute right-36 h-auto w-full flex items-center justify-end ">
            <GoTriangleDown
              className={`text-2xl text-[#7d1f2e] ${
                isPopUpOpen3 ? "flex" : "hidden"
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
