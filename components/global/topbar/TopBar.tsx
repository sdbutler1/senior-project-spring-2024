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
import NotificationList from "./UserNotification/NotificationList";
import MessagesList from "./UserMessages/MessagesList";

// global states
import { globalSideBar } from "@/globalStates/globalSideBar";

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
import { AiOutlineSetting, AiOutlineClose } from "react-icons/ai";

type Props = {};

const Topbar = (props: Props) => {
  const currentPathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();
  const { isSidebarOpen, isSidebarHidden, toggleSideBar, HideSideBar } =
    globalSideBar();
  const [isPopUpOpen1, setPopUpOpen1] = useState(false);
  const [isPopUpOpen2, setPopUpOpen2] = useState(false);
  const [isPopUpOpen3, setPopUpOpen3] = useState(false);

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
      // Narrow the event.target type to HTMLElement
      const target = event.target as HTMLElement;

      // Check if the click event occurred outside of your popups
      if (
        !target.closest("#popup1") &&
        !target.closest("#popup2") &&
        !target.closest("#popup3")
      ) {
        // Close all popups by setting the variables to false
        setPopUpOpen1(false);
        setPopUpOpen2(false);
        setPopUpOpen3(false);
      }
    };

    // Add a click event listener to the entire document
    document.addEventListener("click", closePopupsOnOutsideClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", closePopupsOnOutsideClick);
    };
  }, [isPopUpOpen1, isPopUpOpen2, isPopUpOpen3]);

  if (currentPathname === "/login" || currentPathname === "/forgotPassword") {
    return null;
  }
  return (
    <div
      className={`fixed top-0 left-0 h-20 w-screen flex items-center justify-between ${
        isPopUpOpen1 || isPopUpOpen2 || isPopUpOpen3
          ? "bg-[#fefefe]"
          : "bg-transparent"
      } transition-all`}
      style={{ zIndex: "900" }}
    >
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
      {/* <form className="h-full w-4/6 hidden sm:flex items-center justify-center">
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
      </form> */}
      <ul
        className="h-full w-1/6 flex items-center justify-end gap-4 lg:gap-8 pr-2 lg:pr-8"
        style={{ zIndex: "1200" }}
      >
        <div className="relative flex items-center justify-center cursor-pointer">
          <div className="flex items-center justify-center">
            <li
              className={`relative h-full w-full flex items-center justify-center`}
            >
              <HiSearch className="text-[1rem] lg:text-[1.8rem] text-[#7d1f2e]" />
            </li>
            {/* <li className="w-full h-full flex items-center justify-start text-[1.1rem]">
            Search
          </li> */}
          </div>
        </div>
        <div
          onClick={togglePopUp1}
          className="relative flex items-center justify-center cursor-pointer"
        >
          <div className="flex items-center justify-center">
            <div className="h-auto w-full flex items-center justify-end ">
              <GoTriangleDown
                className={`text-2xl text-[#7d1f2e] ${
                  isPopUpOpen1 ? "flex" : "hidden"
                }`}
              />
            </div>
            <li
              className={`relative h-full w-full flex items-center justify-center`}
            >
              <HiOutlineMail className="text-[1.6rem] lg:text-[2rem] text-[#7d1f2e]" />
              <MessagesCount />
              {/* <TopbarNumber /> */}
            </li>
            {/* <li className="w-full h-full flex items-center justify-start text-[1.1rem]">
            Messages
          </li> */}
          </div>
        </div>
        <div
          onClick={togglePopUp2}
          className="relative flex items-center justify-center cursor-pointer"
        >
          <div className="flex items-center justify-center">
            <div className="h-auto w-full flex items-center justify-end ">
              <GoTriangleDown
                className={`text-2xl text-[#7d1f2e] ${
                  isPopUpOpen2 ? "flex" : "hidden"
                }`}
              />
            </div>
            <li
              className={`relative h-full w-full flex items-center justify-center`}
            >
              <HiOutlineBell className="text-[1.6rem] lg:text-[1.9rem] text-[#7d1f2e]" />
              <NotificationsCount />
            </li>
            {/* <li className="w-full h-full flex items-center justify-start text-[1.1rem]">
            Messages
          </li> */}
          </div>
        </div>
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
            <li
              className={`h-full w-full flex items-center font-bold justify-center gap-2`}
            >
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
          <li className={`h-full w-full flex items-center justify-center`}>
            <HiMenu className="text-[1.5rem] lg:text-[2rem] text-[#7d1f2e]" />
          </li>
          {/* <li className="w-full h-full flex items-center justify-start text-[1.1rem]">
            SideMenu
          </li> */}
        </div>
      </ul>
      {/* ---------- */}
      <div
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
      {/* ---------- */}
      <div
        id="popup2"
        className={`absolute top-20 right-0 h-96 w-80 flex flex-col items-center justify-center text-[#000] bg-[#fefefe] border ${
          isPopUpOpen2 ? "translate-y-0" : "translate-y-[-150%]"
        } transition duration-300 ease-in-out`}
        style={{ zIndex: isPopUpOpen2 ? 1000 : -999 }}
      >
        <div className="h-[2.5rem] w-full flex items-center justify-between gap-4 px-2 border-b-[1px] border-slate-200">
          <h1>Notifications</h1>
          <div className="flex items-center justify-center gap-4">
            <AiOutlineSetting className="cursor-pointer" />
            <AiOutlineClose className="cursor-pointer" />
          </div>
        </div>
        <div className="h-full w-full flex items-center justify-center border-b-[1px] border-slate-100">
          <NotificationList />
        </div>
        <div className="h-[2.5rem] w-full flex items-center justify-between text-sm p-4">
          <div className="cursor-pointer">See all</div>
          <div className="cursor-pointer">Clear</div>
        </div>
      </div>
      {/* ---------- */}
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
      </div>
    </div>
  );
};

export default Topbar;
