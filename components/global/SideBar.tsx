"use client";

// react components
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

//components
import ThemeSwitcher from "./ThemeSwitcher";

// assets
import logo from "../../public/assets/shaw.png";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import { HiHome } from "react-icons/hi2";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PsychologyIcon from "@mui/icons-material/Psychology";
import FeedIcon from "@mui/icons-material/Feed";
import { FaBuildingColumns, FaAddressBook, FaLink } from "react-icons/fa6";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const SideBar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const currentPathname = usePathname();

  const toggleSideBar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (currentPathname === "/login") {
    return null;
  }

  return (
    <div
      className={`sidebar h-screen flex flex-col bg-[#7d1f2e] text-[#fdfdfd] transition-all duration-300 ${
        isSidebarOpen ? "w-80" : "w-20"
      }`}
    >
      <div className="w-full h-20 flex items-center justify-between bg-[#fdfdfd] text-[#000] p-4 ">
        {isSidebarOpen ? (
          <Image
            src={logo}
            alt="logo"
            width="120"
            style={{ height: "auto" }}
            priority
          />
        ) : undefined}
        <div onClick={toggleSideBar}>
          {isSidebarOpen ? (
            <MenuIcon className="text-[2rem] cursor-pointer" />
          ) : (
            <ArrowForwardIosIcon className="text-[2rem] cursor-pointer ml-2" />
          )}
        </div>
      </div>

      <div className="relative w-full h-20 flex items-center justify-between text-4xl pl-4">
        {isSidebarOpen ? "Welcome" : undefined}
        <div className="h-20 flex items-center justify-center pr-2">
          <ThemeSwitcher isSidebarOpen={isSidebarOpen} />
        </div>
      </div>
      <hr
        className={`w-full h-[2px] ${
          isSidebarOpen ? "border-gray-600" : "border-white-800"
        }  my-4`}
      />
      <div
        className={`w-full h-auto ${isSidebarOpen ? "px-8" : "px-4 "} py-4 `}
      >
        <div className=" flex flex-col gap-2">
          <div className="flex items-center justify-start gap-4 p-2">
            <div>
              <HiHome className="text-[1.5rem]" />
            </div>
            <div
              className={`${isSidebarOpen ? "flex" : "hidden"} text-[1.1rem]`}
            >
              Home
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 p-2">
            <div>
              <SchoolIcon className="text-[1.5rem]" />
            </div>
            <div
              className={`${isSidebarOpen ? "flex" : "hidden"} text-[1.1rem]`}
            >
              Students
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 p-2">
            <div>
              <FaBuildingColumns className="text-[1.5rem]" />
            </div>
            <div
              className={`${isSidebarOpen ? "flex" : "hidden"} text-[1.1rem]`}
            >
              Academics
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 py-2 px-1">
            <div>
              <PsychologyIcon className="text-[1.8rem]" />
            </div>
            <div
              className={`${isSidebarOpen ? "flex" : "hidden"} text-[1.1rem]`}
            >
              Research
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 p-2">
            <div>
              <CalendarTodayOutlinedIcon className="text-[1.5rem]" />
            </div>
            <div
              className={`${isSidebarOpen ? "flex" : "hidden"} text-[1.1rem]`}
            >
              Calendar
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 p-2">
            <div>
              <FeedIcon className="text-[1.5rem]" />
            </div>
            <div
              className={`${isSidebarOpen ? "flex" : "hidden"} text-[1.1rem] whitespace-nowrap`}
            >
              News and Events
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 p-2">
            <div>
              <FaAddressBook className="text-[1.5rem]" />
            </div>
            <div
              className={`${isSidebarOpen ? "flex" : "hidden"} text-[1.1rem]`}
            >
              Contact
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 p-2">
            <div>
              <FaLink className="text-[1.5rem]" />
            </div>
            <div
              className={`${isSidebarOpen ? "flex" : "hidden"} text-[1.1rem] whitespace-nowrap`}
            >
              Quick Links
            </div>
          </div>
        </div>
      </div>
      <hr
        className={`w-full h-[2px] ${
          isSidebarOpen ? "border-gray-600" : "border-white-800"
        }  my-4`}
      />
        <div className={`w-full h-12 ${isSidebarOpen ? "flex" : "hidden"} items-center justify-start text-2xl mb-4 p-4`}>
          Account
        </div>
      <div className={`w-full h-auto ${isSidebarOpen ? "px-8" : "px-4 "} `}>
        <div className="flex items-center justify-start gap-4 p-2">
          <div>
            <NotificationsActiveIcon className="text-[1.5rem]" />
          </div>
          <div className={`${isSidebarOpen ? "flex" : "hidden"} text-[1.1rem]`}>
            Notifications
          </div>
        </div>
        <div className="flex items-center justify-start gap-4 p-2">
          <div>
            <SettingsIcon className="text-[1.5rem]" />
          </div>
          <div className={`${isSidebarOpen ? "flex" : "hidden"} text-[1.1rem]`}>
            Settings
          </div>
        </div>
        <div className="flex items-center justify-start gap-4 p-2">
          <div>
            <LogoutIcon className="text-[1.5rem]" />
          </div>
          <div className={`${isSidebarOpen ? "flex" : "hidden"} text-[1.1rem]`}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
