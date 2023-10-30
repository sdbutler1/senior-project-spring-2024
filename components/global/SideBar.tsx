"use client";

// react components
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// global states
import { globalSideBar } from "../../globalStates/globalSideBar";

//components
import ThemeSwitcher from "./ThemeSwitcher";

// assets

// Icons
import { HiHome } from "react-icons/hi2";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PsychologyIcon from "@mui/icons-material/Psychology";
import FeedIcon from "@mui/icons-material/Feed";
import { FaBuildingColumns, FaAddressBook, FaLink } from "react-icons/fa6";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import { TbLogout } from "react-icons/tb";

const SideBar = () => {
  const { isSidebarOpen, isSidebarHidden, toggleSideBar, HideSideBar } =
    globalSideBar();
  const currentPathname = usePathname();

  if (currentPathname === "/login" || currentPathname === "/forgot-password") {
    return null;
  }
  return (
    <div
      className={`fixed bottom-0 left-0 h-[calc(100%-5rem)] z-50 ${
        isSidebarOpen ? "w-80" : isSidebarHidden ? "w-20" : "w-0"
      }  flex flex-col items-center justify-start bg-[#7d1f2e] text-[#fff] overflow-scroll xl:overflow-hidden transition-width duration-500`}
    >
      <div className="h-auto w-full flex items-center justify-end gap-4 pt-2">
        <ArrowForwardIosIcon
          className={`text-[2rem] cursor-pointer hover:text-[#f4b461] hover:scale-105 rotate-180 ${
            isSidebarOpen ? "hidden" : "flex"
          }`}
          onClick={HideSideBar}
        />
        <ArrowForwardIosIcon
          className={`text-[2rem] cursor-pointer hover:text-[#f4b461] hover:scale-105 ${
            isSidebarOpen ? "rotate-180" : "rotate-0"
          }`}
          onClick={toggleSideBar}
        />
      </div>
      <hr className={`w-full border-gray-600 my-4`} />
      <ul className="h-96 2xl:h-auto w-[90%] sm:w-full flex flex-col items-start justify-center px-4">
        <Link
          href={"/"}
          className={`h-[3.5rem] w-full flex items-center justify-center rounded-md cursor-pointer hover:text-[#f4b461] ${
            currentPathname === "/"
              ? "bg-[#6e1d2a9f] text-[#f4b461]"
              : undefined
          }`}
        >
          <li
            className={`h-full ${
              isSidebarOpen ? "w-4/12" : "w-full"
            } flex items-center justify-center text-[1.5rem]`}
          >
            <HiHome />
          </li>
          <li
            className={`h-full w-full items-center justify-start text-[1.1rem] ${
              isSidebarOpen ? "flex" : "hidden"
            } transition duration-500`}
          >
            Home
          </li>
        </Link>
        <Link
          href={"/dashboard"}
          className={`h-[3.5rem] w-full flex items-center justify-center rounded-md cursor-pointer hover:text-[#f4b461] ${
            currentPathname === "/dashboard"
              ? "bg-[#6e1d2a9f] text-[#f4b461]"
              : undefined
          }`}
        >
          <li
            className={`h-full ${
              isSidebarOpen ? "w-4/12" : "w-full"
            } flex items-center justify-center text-[1.5rem]`}
          >
            <DashboardIcon />
          </li>
          <li
            className={`h-full w-full items-center justify-start text-[1.1rem] ${
              isSidebarOpen ? "flex" : "hidden"
            } transition duration-500`}
          >
            Dashboard
          </li>
        </Link>
        <Link
          href={"/student"}
          className={`h-[3.5rem] w-full flex items-center justify-center rounded-md cursor-pointer hover:text-[#f4b461] ${
            currentPathname === "/student"
              ? "bg-[#6e1d2a9f] text-[#f4b461]"
              : undefined
          }`}
        >
          <li
            className={`h-full ${
              isSidebarOpen ? "w-4/12" : "w-full"
            } flex items-center justify-center text-[1.5rem]`}
          >
            <SchoolIcon />
          </li>
          <li
            className={`h-full w-full items-center justify-start text-[1.1rem] ${
              isSidebarOpen ? "flex" : "hidden"
            } transition duration-500`}
          >
            Students
          </li>
        </Link>
        <Link
          href={""}
          className={`h-[3.5rem] w-full flex items-center justify-center rounded-md cursor-pointer text-[#fefefe93] ${
            currentPathname === "" ? "bg-[#6e1d2a9f] text-[#f4b461]" : undefined
          }`}
        >
          <li
            className={`h-full ${
              isSidebarOpen ? "w-4/12" : "w-full"
            } flex items-center justify-center text-[1.1rem]`}
          >
            <FaBuildingColumns />
          </li>
          <li
            className={`h-full w-full items-center justify-start text-[1.1rem] ${
              isSidebarOpen ? "flex" : "hidden"
            } transition duration-500`}
          >
            Academics
          </li>
        </Link>
        <Link
          href={""}
          className={`h-[3.5rem] w-full flex items-center justify-center rounded-md cursor-pointer text-[#fefefe93] ${
            currentPathname === "" ? "bg-[#6e1d2a9f] text-[#f4b461]" : undefined
          }`}
        >
          <li
            className={`h-full ${
              isSidebarOpen ? "w-4/12" : "w-full"
            } flex items-center justify-center text-[1.5rem]`}
          >
            <PsychologyIcon />
          </li>
          <li
            className={`h-full w-full items-center justify-start text-[1.1rem] ${
              isSidebarOpen ? "flex" : "hidden"
            } transition duration-500`}
          >
            Research
          </li>
        </Link>
        <Link
          href={""}
          className={`h-[3.5rem] w-full flex items-center justify-center rounded-md cursor-pointer text-[#fefefe93] ${
            currentPathname === "" ? "bg-[#6e1d2a9f] text-[#f4b461]" : undefined
          }`}
        >
          <li
            className={`h-full ${
              isSidebarOpen ? "w-4/12" : "w-full"
            } flex items-center justify-center text-[1.5rem]`}
          >
            <CalendarTodayOutlinedIcon />
          </li>
          <li
            className={`h-full w-full items-center justify-start text-[1.1rem] ${
              isSidebarOpen ? "flex" : "hidden"
            } transition duration-500`}
          >
            Calendar
          </li>
        </Link>

        <Link
          href={""}
          className={`h-[3.5rem] w-full flex items-center justify-center rounded-md cursor-pointer text-[#fefefe93] ${
            currentPathname === "" ? "bg-[#6e1d2a9f] text-[#f4b461]" : undefined
          }`}
        >
          <li
            className={`h-full ${
              isSidebarOpen ? "w-4/12" : "w-full"
            } flex items-center justify-center text-[1.5rem]`}
          >
            <FeedIcon />
          </li>
          <li
            className={`h-full w-full items-center justify-start text-[1.1rem] ${
              isSidebarOpen ? "flex" : "hidden"
            } transition duration-500`}
          >
            News and Events
          </li>
        </Link>
        <Link
          href={""}
          className={`h-[3.5rem] w-full flex items-center justify-center rounded-md cursor-pointer text-[#fefefe93] ${
            currentPathname === "" ? "bg-[#6e1d2a9f] text-[#f4b461]" : undefined
          }`}
        >
          <li
            className={`h-full ${
              isSidebarOpen ? "w-4/12" : "w-full"
            } flex items-center justify-center text-[1.5rem]`}
          >
            <FaAddressBook />
          </li>
          <li
            className={`h-full w-full items-center justify-start text-[1.1rem] ${
              isSidebarOpen ? "flex" : "hidden"
            } transition duration-500`}
          >
            Contact
          </li>
        </Link>
        <Link
          href={""}
          className={`h-[3.5rem] w-full flex items-center justify-center rounded-md cursor-pointer text-[#fefefe93] ${
            currentPathname === "" ? "bg-[#6e1d2a9f] text-[#f4b461]" : undefined
          }`}
        >
          <li
            className={`h-full ${
              isSidebarOpen ? "w-4/12" : "w-full"
            } flex items-center justify-center text-[1.5rem]`}
          >
            <FaLink />
          </li>
          <li
            className={`h-full w-full items-center justify-start text-[1.1rem] ${
              isSidebarOpen ? "flex" : "hidden"
            } transition duration-500`}
          >
            Quick Links
          </li>
        </Link>
      </ul>
      <hr className={`w-full border-gray-600 my-2`} />
      <ul className="h-32 2xl:h-auto w-[90%] sm:w-full flex flex-col items-start justify-center px-4">
        <Link
          href={""}
          className={`h-[3.5rem] w-full flex items-center justify-center rounded-md cursor-pointer text-[#fefefe93] ${
            currentPathname === "" ? "bg-[#6e1d2a9f] text-[#f4b461]" : undefined
          }`}
        >
          <li
            className={`h-full ${
              isSidebarOpen ? "w-4/12" : "w-full"
            } flex items-center justify-center text-[1.5rem]`}
          >
            <HelpOutlineRoundedIcon />
          </li>
          <li
            className={`h-full w-full items-center justify-start text-[1.1rem] ${
              isSidebarOpen ? "flex" : "hidden"
            } transition duration-500`}
          >
            About
          </li>
        </Link>
        <Link
          href={""}
          className={`h-[3.5rem] w-full flex items-center justify-center rounded-md cursor-pointer text-[#fefefe93] ${
            currentPathname === "" ? "bg-[#6e1d2a9f] text-[#f4b461]" : undefined
          }`}
        >
          <li
            className={`h-full ${
              isSidebarOpen ? "w-4/12" : "w-full"
            } flex items-center justify-center text-[1.5rem]`}
          >
            <SettingsIcon />
          </li>
          <li
            className={`h-full w-full items-center justify-start text-[1.1rem] ${
              isSidebarOpen ? "flex" : "hidden"
            } transition duration-500`}
          >
            Settings
          </li>
        </Link>
        <div className="h-[3.5rem] w-full flex items-center justify-center hover:text-[#f4b461] cursor-pointer">
          <li
            className={`h-full ${
              isSidebarOpen ? "w-4/12" : "w-full"
            } flex items-center justify-center text-[1.5rem]`}
          >
            <TbLogout className="ml-[6px]" />
          </li>
          <li
            className={`h-full w-full items-center justify-start text-[1.1rem] ${
              isSidebarOpen ? "flex" : "hidden"
            } transition duration-500`}
          >
            Logout
          </li>
        </div>
      </ul>
      <div
        className={`h-24 sm:h-12 w-[80%] sm:w-11/12 flex items-center justify-center text-xl bg-[#6e1d2a9f] rounded-md mt-2 p-2 sm:p-0 px-4 mb-4 sm:mb-0`}
        onClick={!isSidebarOpen ? toggleSideBar : undefined}
      >
        <ThemeSwitcher isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default SideBar;
