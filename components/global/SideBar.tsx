"use client";

// react components
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// global states
import { globalSideBar } from "../../globalStates/globalSideBar";

//components
import ThemeSwitcher from "./ThemeSwitcher";

// assets

// Icons
import { HiHome } from "react-icons/hi2";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdSchool,
  MdPsychology,
  MdCalendarToday,
  MdDashboard,
  MdFeed,
  MdContacts,
  MdOutlineHelp,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import { BiLink } from "react-icons/bi";
import { FaBuildingColumns } from "react-icons/fa6";

const SideBar = () => {
  const { isSidebarOpen, isSidebarHidden, toggleSideBar, HideSideBar } =
    globalSideBar();
  const currentPathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  if (currentPathname === "/login" || currentPathname === "/forgotPassword") {
    return null;
  }
  return (
    <div
      className={`fixed bottom-0 left-0 h-[calc(100%-5rem)] ${
        isSidebarOpen ? "w-64" : isSidebarHidden ? "w-20" : "invisible w-0"
      }  flex flex-col items-center justify-start text-[#fff] bg-[#7d1f2e] z-10 transition-width duration-500`}
    >
      <div
        className={`h-12 w-full items-center ${
          isSidebarOpen ? "justify-end" : "justify-center"
        } ${isSidebarHidden ? "flex" : "hidden"} gap-2 text-[2rem]`}
      >
        <button
          onClick={isSidebarOpen ? toggleSideBar : HideSideBar}
          className={`hover:text-[#f4b461] hover:scale-105 cursor-pointer mr-2`}
        >
          <MdKeyboardArrowLeft />
        </button>
        <button
          className={`hover:text-[#f4b461] hover:scale-105 cursor-pointer ${
            isSidebarOpen ? "hidden" : "flex"
          }`}
          onClick={toggleSideBar}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
      <ul className="h-96 2xl:h-auto w-[90%] sm:w-full flex flex-col items-start justify-center px-4">
        <Link
          href={"/"}
          className={`relative h-[3.5rem] w-full flex items-center justify-center rounded-md hover:text-[#f4b461] ${
            currentPathname === "/"
              ? "bg-[#6e1d2a9f] text-[#f4b461]"
              : undefined
          }`}
        >
          <li
            className={`absolute left-0 h-full w-full flex items-center text-[1.4rem] ${
              isSidebarOpen ? "justify-start pl-6" : "justify-center pl-0 "
            } `}
          >
            <HiHome />
          </li>
          <li
            className={`absolute right-0 h-full w-full flex items-center justify-center text-[1.1rem] whitespace-nowrap pr-[2.5rem] ${
              isSidebarOpen ? "opacity-100 delay-200" : "opacity-0"
            } transition-opacity `}
          >
            Home
          </li>
        </Link>
        <Link
          href={"/dashboard"}
          className={`relative h-[3.5rem] w-full flex items-center justify-center rounded-md hover:text-[#f4b461] ${
            currentPathname === "/dashboard"
              ? "bg-[#6e1d2a9f] text-[#f4b461]"
              : undefined
          }`}
        >
          <li
            className={`absolute left-0 h-full w-full flex items-center text-[1.4rem] ${
              isSidebarOpen ? "justify-start pl-6" : "justify-center pl-0"
            } `}
          >
            <MdDashboard />
          </li>
          <li
            className={`absolute right-0 h-full w-full flex items-center justify-center text-[1.1rem] whitespace-nowrap ${
              isSidebarOpen ? "opacity-100 delay-200" : "opacity-0"
            } transition-opacity `}
          >
            Dashboard
          </li>
        </Link>
        <Link
          href={"/student"}
          className={`relative h-[3.5rem] w-full flex items-center justify-center rounded-md hover:text-[#f4b461] ${
            currentPathname === "/student"
              ? "bg-[#6e1d2a9f] text-[#f4b461]"
              : undefined
          }`}
        >
          <li
            className={`absolute left-0 h-full w-full flex items-center text-[1.4rem] ${
              isSidebarOpen ? "justify-start pl-6" : "justify-center pl-0"
            } `}
          >
            <MdSchool />
          </li>
          <li
            className={`absolute right-0 h-full w-full flex items-center justify-center text-[1.1rem] whitespace-nowrap pr-[1.05rem] ${
              isSidebarOpen ? "opacity-100 delay-200" : "opacity-0"
            } transition-opacity `}
          >
            Students
          </li>
        </Link>
        <Link
          href={""}
          className={`relative h-[3.5rem] w-full flex items-center justify-center rounded-md text-[#fefefe93] ${
            currentPathname === "" ? "bg-[#6e1d2a9f] text-[#f4b461]" : undefined
          }`}
        >
          <li
            className={`absolute left-0 h-full w-full flex items-center text-[1.1rem] ${
              isSidebarOpen
                ? "justify-start pl-[1.7rem]"
                : "justify-center pl-0"
            } `}
          >
            <FaBuildingColumns />
          </li>
          <li
            className={`absolute right-0 h-full w-full flex items-center justify-center text-[1.1rem] whitespace-nowrap ${
              isSidebarOpen ? "opacity-100 delay-200" : "opacity-0"
            } transition-opacity `}
          >
            Academics
          </li>
        </Link>
        <Link
          href={""}
          className={`relative h-[3.5rem] w-full flex items-center justify-center rounded-md text-[#fefefe93] ${
            currentPathname === "" ? "bg-[#6e1d2a9f] text-[#f4b461]" : undefined
          }`}
        >
          <li
            className={`absolute left-0 h-full w-full flex items-center text-[1.4rem] ${
              isSidebarOpen ? "justify-start pl-6" : "justify-center pl-0"
            } `}
          >
            <MdPsychology />
          </li>
          <li
            className={`absolute right-0 h-full w-full flex items-center justify-center text-[1.1rem] whitespace-nowrap pr-[0.7rem] ${
              isSidebarOpen ? "opacity-100 delay-200" : "opacity-0"
            } transition-opacity `}
          >
            Research
          </li>
        </Link>
        <Link
          href={""}
          className={`relative h-[3.5rem] w-full flex items-center justify-center rounded-md text-[#fefefe93] ${
            currentPathname === "" ? "bg-[#6e1d2a9f] text-[#f4b461]" : undefined
          }`}
        >
          <li
            className={`absolute left-0 h-full w-full flex items-center text-[1.4rem] ${
              isSidebarOpen ? "justify-start pl-6" : "justify-center pl-0"
            } `}
          >
            <MdCalendarToday />
          </li>
          <li
            className={`absolute right-0 h-full w-full flex items-center justify-center text-[1.1rem] whitespace-nowrap pr-4 ${
              isSidebarOpen ? "opacity-100 delay-200" : "opacity-0"
            } transition-opacity `}
          >
            Calendar
          </li>
        </Link>
        <Link
          href={""}
          className={`relative h-[3.5rem] w-full flex items-center justify-center rounded-md text-[#fefefe93] ${
            currentPathname === "" ? "bg-[#6e1d2a9f] text-[#f4b461]" : undefined
          }`}
        >
          <li
            className={`absolute left-0 h-full w-full flex items-center text-[1.4rem] ${
              isSidebarOpen ? "justify-start pl-6" : "justify-center pl-0"
            } `}
          >
            <MdFeed />
          </li>
          <li
            className={`absolute right-0 h-full w-full flex items-center justify-center text-[1.1rem] whitespace-nowrap pl-[3.2rem] ${
              isSidebarOpen ? "opacity-100 delay-200" : "opacity-0"
            } transition-opacity `}
          >
            News and Events
          </li>
        </Link>
        <Link
          href={""}
          className={`relative h-[3.5rem] w-full flex items-center justify-center rounded-md text-[#fefefe93] ${
            currentPathname === "" ? "bg-[#6e1d2a9f] text-[#f4b461]" : undefined
          }`}
        >
          <li
            className={`absolute left-0 h-full w-full flex items-center text-[1.4rem] ${
              isSidebarOpen ? "justify-start pl-6" : "justify-center pl-0"
            } `}
          >
            <MdContacts />
          </li>
          <li
            className={`absolute right-0 h-full w-full flex items-center justify-center text-[1.1rem] whitespace-nowrap pr-[1.6rem] ${
              isSidebarOpen ? "opacity-100 delay-200" : "opacity-0"
            } transition-opacity `}
          >
            Contact
          </li>
        </Link>
        <Link
          href={""}
          className={`relative h-[3.5rem] w-full flex items-center justify-center rounded-md text-[#fefefe93] ${
            currentPathname === "" ? "bg-[#6e1d2a9f] text-[#f4b461]" : undefined
          }`}
        >
          <li
            className={`absolute left-0 h-full w-full flex items-center text-[1.4rem] ${
              isSidebarOpen ? "justify-start pl-6" : "justify-center pl-0"
            } `}
          >
            <BiLink />
          </li>
          <li
            className={`absolute right-0 h-full w-full flex items-center justify-center text-[1.1rem] whitespace-nowrap pl-[0.35rem] ${
              isSidebarOpen ? "opacity-100 delay-200" : "opacity-0"
            } transition-opacity `}
          >
            Quick Links
          </li>
        </Link>
      </ul>
      <hr className={`w-full border-gray-600 my-2`} />
      <ul className="h-32 2xl:h-auto w-[90%] sm:w-full flex flex-col items-start justify-center px-4">
        <Link
          href={""}
          className={`relative h-[3.5rem] w-full flex items-center justify-center rounded-md text-[#fefefe93] ${
            currentPathname === "" ? "bg-[#6e1d2a9f] text-[#f4b461]" : undefined
          }`}
        >
          <li
            className={`absolute left-0 h-full w-full flex items-center text-[1.4rem] ${
              isSidebarOpen ? "justify-start pl-6" : "justify-center pl-0"
            } `}
          >
            <MdOutlineHelp />
          </li>
          <li
            className={`absolute right-0 h-full w-full flex items-center justify-center text-[1.1rem] whitespace-nowrap pr-[2.45rem] ${
              isSidebarOpen ? "opacity-100 delay-200" : "opacity-0"
            } transition-opacity `}
          >
            About
          </li>
        </Link>
        <Link
          href={""}
          className={`relative h-[3.5rem] w-full flex items-center justify-center rounded-md text-[#fefefe93] ${
            currentPathname === "" ? "bg-[#6e1d2a9f] text-[#f4b461]" : undefined
          }`}
        >
          <li
            className={`absolute left-0 h-full w-full flex items-center text-[1.4rem] ${
              isSidebarOpen ? "justify-start pl-6" : "justify-center pl-0"
            } `}
          >
            <MdSettings />
          </li>
          <li
            className={`absolute right-0 h-full w-full flex items-center justify-center text-[1.1rem] whitespace-nowrap pr-[1.4rem] ${
              isSidebarOpen ? "opacity-100 delay-200" : "opacity-0"
            } transition-opacity `}
          >
            Settings
          </li>
        </Link>
        <Link
          href={""}
          className={`relative h-[3.5rem] w-full flex items-center justify-center rounded-md hover:text-[#f4b461] ${
            currentPathname === "" ? "bg-[#6e1d2a9f] text-[#f4b461]" : undefined
          }`}
        >
          <li
            className={`absolute left-0 h-full w-full flex items-center text-[1.4rem] ${
              isSidebarOpen ? "justify-start pl-6" : "justify-center pl-0"
            } `}
          >
            <MdLogout />
          </li>
          <li
            className={`absolute right-0 h-full w-full flex items-center justify-center text-[1.1rem] whitespace-nowrap pr-[1.1rem] ${
              isSidebarOpen ? "opacity-100 delay-200" : "opacity-0"
            } transition-opacity `}
          >
            <button
              type="button"
              onClick={() => {
                logout(), router.push("/login");
              }}
            >
              Sign Out
            </button>
          </li>
        </Link>
      </ul>
      <div
        className={`h-12 w-[80%] sm:w-10/12 flex items-center justify-center text-xl bg-[#6e1d2a9f] rounded-md my-4`}
      >
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default SideBar;
