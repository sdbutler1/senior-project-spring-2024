"use client";

// react components
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

//components
import ThemeSwitcher from "../ThemeSwitcher";
import useSidebarStore from './sideBarStore';

// assets
import logo from "../../../public/assets/shaw.png";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import { HiHome } from "react-icons/hi2";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PsychologyIcon from "@mui/icons-material/Psychology";
import FeedIcon from "@mui/icons-material/Feed";
import { FaBuildingColumns, FaAddressBook, FaLink } from "react-icons/fa6";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const SideBar = () => {
  const { isSidebarOpen, setSidebarOpen } = useSidebarStore();
  const currentPathname = usePathname();

  const toggleSideBar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (currentPathname === "/login" || currentPathname === "/forgot-password") {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 h-screen w-80 flex flex-col items-center justify-start z-50">
      <div
        className={`h-20 w-80 bg-[#fdfdfd] flex items-center justify-between text-[#000] p-2 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-[15rem]"
        } transition-transform duration-700`}
      >
        <Image
          src={logo}
          alt="logo"
          width="120"
          style={{ height: "full" }}
          priority
        />
        <div
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-[0.8rem]"
          } transition-transform duration-700`}
        >
          {isSidebarOpen ? (
            <MenuIcon
              className="text-[2rem] cursor-pointer hover:text-[#f4b461] hover:scale-105"
              onClick={toggleSideBar}
            />
          ) : (
            <ArrowForwardIosIcon
              className="text-[2rem] cursor-pointer hover:text-[#f4b461] hover:scale-105"
              onClick={toggleSideBar}
            />
          )}
        </div>
      </div>
      <div
        className={`h-20 w-80 flex items-center justify-between bg-[#7d1f2e] text-[#fff] px-2 py-8 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-[15rem]"
        } transition-transform duration-700`}
      >
        <div className="text-4xl">Welcome</div>
        <div>
          <ThemeSwitcher isSidebarOpen={isSidebarOpen} />
        </div>
      </div>
      <div
        className={`w-full h-8 bg-[#7d1f2e] ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-[15rem]"
        } transition-transform duration-700`}
      >
        <hr
          className={`w-full h-[2px] ${
            isSidebarOpen ? "border-gray-600" : "border-white-800"
          }  my-4`}
        />
      </div>
      <div className="h-full w-full flex items-center justify-center">
        <div className="h-full w-20 bg-[#7d1f2e] text-[#fdfdfd] z-50 ">
          <ul className="h-[30rem] w-full flex flex-col items-center justify-end">
            <li
              className={`h-full w-full flex items-center justify-center text-[1.5rem]`}
            >
              <HiHome />
            </li>
            <li
              className={`h-full w-full flex items-center justify-center text-[1.5rem]`}
            >
              <SchoolIcon />
            </li>
            <li
              className={`h-full w-full flex items-center justify-center text-[1.5rem]`}
            >
              <FaBuildingColumns />
            </li>
            <li
              className={`h-full w-full flex items-center justify-center text-[1.5rem]`}
            >
              <PsychologyIcon />
            </li>
            <li
              className={`h-full w-full flex items-center justify-center text-[1.5rem]`}
            >
              <CalendarTodayOutlinedIcon />
            </li>
            <li
              className={`h-full w-full flex items-center justify-center text-[1.5rem]`}
            >
              <FeedIcon />
            </li>
            <li
              className={`h-full w-full flex items-center justify-center text-[1.5rem]`}
            >
              <FaAddressBook />
            </li>
            <li
              className={`h-full w-full flex items-center justify-center text-[1.5rem]`}
            >
              <FaLink />
            </li>
          </ul>
        </div>
        <div
          className={`h-full w-60 bg-[#7d1f2e] text-[#fdfdfd] z-40 pl-4 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-[15rem]"
          } transition-transform duration-700 `}
        >
          <ul className="h-[30rem] w-full flex flex-col items-center justify-center">
            <li className="h-full w-full flex items-center justify-start text-[1.1rem]">
              Home
            </li>
            <li className="h-full w-full flex items-center justify-start text-[1.1rem]">
              Students
            </li>
            <li className="h-full w-full flex items-center justify-start text-[1.1rem]">
              Academics
            </li>
            <li className="h-full w-full flex items-center justify-start text-[1.1rem]">
              Research
            </li>
            <li className="h-full w-full flex items-center justify-start text-[1.1rem]">
              Calendar
            </li>
            <li className="h-full w-full flex items-center justify-start text-[1.1rem]">
              News and Events
            </li>
            <li className="h-full w-full flex items-center justify-start text-[1.1rem]">
              Contact
            </li>
            <li className="h-full w-full flex items-center justify-start text-[1.1rem]">
              Quick Links
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`w-full h-8 bg-[#7d1f2e] ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-[15rem]"
        } transition-transform duration-700`}
      >
        <hr
          className={`w-full h-[2px] ${
            isSidebarOpen ? "border-gray-600" : "border-white-800"
          }  my-4`}
        />
      </div>
      <div className="h-full w-full flex items-center justify-center">
        <div className="h-full w-20 bg-[#7d1f2e] text-[#fdfdfd] z-50 ">
          <ul className="h-[14rem] w-full flex flex-col items-center justify-end">
            <li
              className={`h-full w-full flex items-center justify-center text-[1.5rem]`}
            >
              <AccountCircleIcon />
            </li>
            <li
              className={`h-full w-full flex items-center justify-center text-[1.5rem]`}
            >
              <NotificationsActiveIcon />
            </li>
            <li
              className={`h-full w-full flex items-center justify-center text-[1.5rem]`}
            >
              <SettingsIcon />
            </li>
            <li
              className={`h-full w-full flex items-center justify-center text-[1.5rem] pl-2`}
            >
              <LogoutIcon />
            </li>
          </ul>
        </div>
        <div
          className={`h-full w-60 bg-[#7d1f2e] text-[#fdfdfd] z-40 pl-4 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-[15rem]"
          } transition-transform duration-700 `}
        >
          <ul className="h-[14rem] w-full flex flex-col items-center justify-center">
            <li className="w-full h-full flex items-center justify-start text-[1.1rem]">
              Account
            </li>
            <li className="w-full h-full flex items-center justify-start text-[1.1rem]">
              Notifications
            </li>
            <li className="w-full h-full flex items-center justify-start text-[1.1rem]">
              Settings
            </li>
            <li className="w-full h-full flex items-center justify-start text-[1.1rem]">
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
