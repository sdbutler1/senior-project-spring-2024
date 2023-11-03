"use client";

// react components
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

// components
import { useAuth } from "@/context/AuthContext";
import NotificationsCount from "@/components/global/topbar/UserNotification/NotificationsCount";
import MessagesCount from "@/components/global/topbar/UserMessages/MessagesCount";
import MessagesList from "./UserMessages/MessagesList";
import NotificationPopup from "./UserNotification/NotificationPopup";

// global states
import { globalSideBar } from "@/globalStates/globalSideBar";
import usePopUpStore from "@/globalStates/globalPopUp";

// assets
import logo from "@/public/assets/shaw.png";

// Icons
import { MdDashboard, MdLogout } from "react-icons/md";
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
  const router = useRouter();
  const { logout, user } = useAuth();
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

  const togglePopUp1 = () => {
    setPopUpOpen1(!isPopUpOpen1);
    setPopUpOpen2(false);
    setPopUpOpen3(false);
  };

  const togglePopUp2 = () => {
    setPopUpOpen2(!isPopUpOpen2);
    setPopUpOpen1(false);
    setPopUpOpen3(false);
  };

  const togglePopUp3 = () => {
    setPopUpOpen3(!isPopUpOpen3);
    setPopUpOpen1(false);
    setPopUpOpen2(false);
  };

  useEffect(() => {
    const closePopupsOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest("#popup1") &&
        !target.closest("#popup2") &&
        !target.closest("#popup3")
      ) {
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
          <div className="group flex flex-col items-center justify-center">
            <li className="h-full w-full flex items-center justify-center">
              <HiSearch className="text-[1.6rem] lg:text-[2rem] text-[#7d1f2e]" />
            </li>
            <li className="absolute top-[-1.7rem] right-4 w-full h-full flex items-center justify-start text-[1.1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Search
            </li>
          </div>
        </button>
        <button
          type="button"
          onClick={togglePopUp1}
          className="relative flex items-center justify-center"
        >
          <div className="absolute right-[1.8rem] h-auto w-full flex items-center justify-end ">
            <GoTriangleDown
              className={`text-2xl text-[#7d1f2e] ${
                isPopUpOpen1 ? "flex" : "hidden"
              }`}
            />
          </div>
          <div className="group flex flex-col items-center justify-center">
            <li className="h-full w-full flex items-center justify-center">
              <HiOutlineMail className="text-[1.6rem] lg:text-[2rem] text-[#7d1f2e]" />
              <MessagesCount />
            </li>
            <li className="absolute top-[-1.7rem] right-6 w-full h-full flex items-center justify-start text-[1.1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Messages
            </li>
          </div>
        </button>
        <button
          type="button"
          onClick={togglePopUp2}
          className="relative flex items-center justify-center"
        >
          <div className="absolute right-6 h-auto w-full flex items-center justify-end ">
            <GoTriangleDown
              className={`text-2xl text-[#7d1f2e] ${
                isPopUpOpen2 ? "flex" : "hidden"
              }`}
            />
          </div>
          <div className="group flex flex-col items-center justify-center">
            <li className="h-full w-full flex items-center justify-center">
              <HiOutlineBell className="text-[1.6rem] lg:text-[1.9rem] text-[#7d1f2e]" />
              <NotificationsCount />
            </li>
            <li className="absolute top-[-1.7rem] right-6 w-full h-full flex items-center justify-start text-[1.1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Notifications
            </li>
          </div>
        </button>
        <div
          onClick={togglePopUp3}
          className="flex items-center justify-center cursor-pointer"
        >
          <div className="flex items-center justify-center">
            <div className="h-auto w-full flex items-center justify-end ">
              <GoTriangleDown
                className={`text-2xl text-[#7d1f2e] ${
                  isPopUpOpen3 ? "flex" : "hidden"
                }`}
              />
            </div>
            <li className="h-full w-full flex items-center font-bold justify-center gap-2">
              <HiOutlineUserCircle className="text-[1.6rem] lg:text-[2rem] text-[#7d1f2e]" />
              {user ? user.email.split("@")[0] : undefined}
            </li>
          </div>
          {/* <li className="w-full h-full flex items-center justify-start text-[1.1rem]">
            Account
          </li> */}
        </div>
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
          {/* <li className="w-full h-full flex items-center justify-start text-[1.1rem]">
            SideMenu
          </li> */}
        </div>
      </div>
      {/* <div
        id="popup1"
        className={`absolute top-20 right-0 h-96 w-80 flex flex-col items-center justify-center text-[#000] bg-[#fefefe] border ${
          isPopUpOpen1 ? "translate-y-0" : "translate-y-[-150%]"
        } transition duration-300 ease-in-out`}
        style={{ zIndex: isPopUpOpen1 ? 1000 : -999 }}
      >
        <div className="h-[2.5rem] w-full flex items-center justify-between gap-4 px-2 border-b-[1px] border-slate-200">
          <h1>Messages</h1>
          <div className="flex items-center justify-center gap-4">
            <AiOutlineSetting className="cursor-pointer" />
            <AiOutlineClose className="cursor-pointer" />
          </div>
        </div>
        <div className="h-full w-full border-b-[1px] border-slate-100">
          <MessagesList />
        </div>
        <div className="h-[2.5rem] w-full flex items-center justify-between text-sm p-4">
          <div className="cursor-pointer">See all</div>
          <div className="cursor-pointer">Clear</div>
        </div>
      </div>
      <div
        id="popup3"
        className={`absolute top-20 right-0 h-96 w-80 flex flex-col items-center justify-center text-[#000] bg-[#fefefe] border ${
          isPopUpOpen3 ? "translate-y-0" : "translate-y-[-150%]"
        } transition duration-300 ease-in-out`}
        style={{ zIndex: isPopUpOpen3 ? 1000 : -999 }}
      >
        <Link
          href={"/dashboard"}
          className="relative h-full w-full flex items-center justify-center"
        >
          <div className="h-full w-full flex items-center justify-center">
            <MdDashboard />
            <div>Dashboard</div>
          </div>
        </Link>
        <Link
          href={"/dashboard"}
          className="relative h-full w-full flex items-center justify-center"
        >
          <div className="h-full w-full flex items-center justify-center">
            <MdLogout />
            <button
              type="button"
              onClick={() => {
                logout(), router.push("/login");
              }}
            >
              Sign Out
            </button>
          </div>
        </Link>
      </div> */}
    </div>
  );
};

export default Topbar;
