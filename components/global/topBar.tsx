"use client";

// react components
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

// global states
import { globalSideBar } from "../../globalStates/globalSideBar";

// assets
import logo from "../../public/assets/Shaw.png";

// Icons
import { BsSearch } from "react-icons/bs";
import {
  HiOutlineMail,
  HiOutlineBell,
  HiOutlineUserCircle,
  HiMenu,
  HiOutlineCheck,
} from "react-icons/hi";
import { GoTriangleDown } from "react-icons/go";
import { AiOutlineSetting } from "react-icons/ai";

type Props = {};

const topbar = (props: Props) => {
  const currentPathname = usePathname();
  const { isSidebarOpen, isSidebarHidden, toggleSideBar, HideSideBar } =
    globalSideBar();
  const [isPopUpOpen1, setPopUpOpen1] = useState(false);
  const [isPopUpOpen2, setPopUpOpen2] = useState(false);
  const [isPopUpOpen3, setPopUpOpen3] = useState(false);
  const [zIndexForPopUp, setZIndexForPopUp] = useState(1000); // Set an initial z-index value

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

  if (currentPathname === "/login" || currentPathname === "/forgot-password") {
    return null;
  }
  return (
    <div
      className={`h-20 w-screen flex items-center justify-between ${
        isPopUpOpen1 || isPopUpOpen2 || isPopUpOpen3
          ? "bg-[#fefefe]"
          : "bg-transparent delay-500"
      } transition-all`}
    >
      <div className="h-20 lg:w-1/6 flex items-center justify-start px-2">
        <Image
          src={logo}
          alt="logo"
          className="h-4/5 w-8/12 md:h-5/6 md:w-9/12 object-fit"
          priority
        />
      </div>
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
      <ul className="h-full w-1/6 flex items-center justify-end gap-4 lg:gap-8 pr-2 lg:pr-8" style={{ zIndex: "1200" }}>
        <div className="relative flex items-center justify-center">
          <div
            className="flex items-center justify-center"
            onClick={togglePopUp1}
          >
            <div className="h-auto w-full flex items-center justify-end ">
              <GoTriangleDown
                className={`text-4xl text-[#7d1f2e] cursor-pointer ${
                  isPopUpOpen1 ? "flex" : "hidden"
                }`}
                onClick={togglePopUp1}
              />
            </div>
            <li
              className={`h-full w-full flex items-center justify-center cursor-pointer`}
            >
              <HiOutlineMail className="text-[1.8rem] lg:text-[2.2rem] text-[#7d1f2e]" />
            </li>
            {/* <li className="w-full h-full flex items-center justify-start text-[1.1rem]">
            Messages
          </li> */}
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div
            className="flex items-center justify-center"
            onClick={togglePopUp2}
          >
            <div className="h-auto w-full flex items-center justify-end ">
              <GoTriangleDown
                className={`text-4xl text-[#7d1f2e] cursor-pointer ${
                  isPopUpOpen2 ? "flex" : "hidden"
                }`}
                onClick={togglePopUp2}
              />
            </div>
            <li className={`h-full w-full flex items-center justify-center`}>
              <HiOutlineBell className="text-[1.8rem] lg:text-[2.2rem] text-[#7d1f2e] cursor-pointer" />
            </li>
            {/* <li className="w-full h-full flex items-center justify-start text-[1.1rem]">
            Messages
          </li> */}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center">
            <li className={`h-full w-full flex items-center justify-center`}>
              <HiOutlineUserCircle className="text-[1.6rem] lg:text-[2rem] text-[#7d1f2e]" />
            </li>
            <GoTriangleDown className="text-[1.5rem] text-[#7d1f2e]" />
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
            <HiMenu className="text-[1.6rem] lg:text-[2rem] text-[#7d1f2e]" />
          </li>
          {/* <li className="w-full h-full flex items-center justify-start text-[1.1rem]">
            SideMenu
          </li> */}
        </div>
      </ul>
      <div
        className={`absolute top-20 right-16 h-96 w-80 flex flex-col items-center justify-center text-[#000] bg-[#fefefe] border ${
          isPopUpOpen1 ? "translate-y-0" : "translate-y-[-150%]"
        } transition duration-1000 ease-in-out`}
        style={{ zIndex: isPopUpOpen1 ? 1000 : -999 }}
      >
        <div className="h-[2.5rem] w-full flex items-center justify-end gap-4 px-4 border-b-[1px] border-slate-200">
          <HiOutlineCheck className="cursor-pointer" />
          <AiOutlineSetting className="cursor-pointer" />
        </div>
        <div className="h-full w-full border-b-[1px] border-slate-100"></div>
        <div className="h-[2.5rem] w-full flex items-center justify-center text-sm cursor-pointer">
          See all
        </div>
      </div>
      <div
        className={`absolute top-20 right-4 h-96 w-80 flex flex-col items-center justify-center text-[#000] bg-[#fefefe] border ${
          isPopUpOpen2 ? "translate-y-0" : "translate-y-[-150%]"
        } transition duration-1000 ease-in-out`}
        style={{ zIndex: isPopUpOpen2 ? 1000 : -999 }}
      >
        <div className="h-[2.5rem] w-full flex items-center justify-end gap-4 px-4 border-b-[1px] border-slate-200">
          <HiOutlineCheck className="cursor-pointer" />
          <AiOutlineSetting className="cursor-pointer" />
        </div>
        <div className="h-full w-full border-b-[1px] border-slate-100"></div>
        <div className="h-[2.5rem] w-full flex items-center justify-center text-sm cursor-pointer">
          See all
        </div>
      </div>
    </div>
  );
};

export default topbar;
