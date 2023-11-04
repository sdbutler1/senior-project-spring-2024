"use client";

// react components
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// global states
import usePopUpStore from "@/globalStates/globalPopUp";

// components
import PopUpCards from "./PopUpCards";
import { useAuth } from "@/context/AuthContext";

// Icons
import { AiOutlineSetting, AiOutlineClose } from "react-icons/ai";
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaUserLock } from "react-icons/fa6";
import BubbleCount from "./BubbleCount";

type Props = {};

const Popup = (props: Props) => {
  const { logout } = useAuth();
  const currentPathname = usePathname();
  const {
    isPopUpOpen1,
    setPopUpOpen1,
    isPopUpOpen2,
    setPopUpOpen2,
    isPopUpOpen3,
    setPopUpOpen3,
  } = usePopUpStore();
  const [popUpSection, setPopUpSection] = useState("All");
  const [popUpSlider, setPopUpSlider] = useState("translate-x-0");
  const toggleSection = (section: string) => {
    if (section === "All") {
      setPopUpSlider("translate-x-0");
      setPopUpSection("All");
    } else if (section === "Unread") {
      setPopUpSlider("translate-x-[5.5rem]");
      setPopUpSection("Unread");
    } else if (section === "Read") {
      setPopUpSlider("translate-x-[12.5rem]");
      setPopUpSection("Read");
    }
  };

  const closePopUp = () => {
    setPopUpOpen1(false);
    setPopUpOpen2(false);
    setPopUpOpen3(false);
  };

  useEffect(() => {
    const closePopupsOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".topbarPopup") && !target.closest(".popup")) {
        setPopUpSlider("translate-x-0");
        setPopUpSection("All");
      }
    };
    document.addEventListener("click", closePopupsOnOutsideClick);
    return () => {
      document.removeEventListener("click", closePopupsOnOutsideClick);
    };
  }, [setPopUpSlider, setPopUpSection]);

  if (currentPathname === "/login" || currentPathname === "/forgotPassword") {
    return null;
  }

  return (
    <div className="flex items-center justify-between">
      {/* Messages */}
      <div
        id="popup"
        className={`topbarPopup relative right-20 h-[28rem] w-[25rem] flex-col items-center justify-start text-black bg-[#fefefe] border rounded-2xl mr-8 ${
          isPopUpOpen1 ? "flex" : "hidden"
        }`}
      >
        <div className="h-[2.5rem] w-full flex items-center justify-between p-6">
          <h1 className=" font-bold tracking-wider">Messages</h1>
          <div className="flex items-center justify-center gap-4">
            <AiOutlineSetting className="cursor-pointer" />
            <AiOutlineClose className="cursor-pointer" onClick={closePopUp} />
          </div>
        </div>
        <div className="h-[2.5rem] w-full flex flex-col items-center justify-center">
          <div className="h-full w-full flex items-center justify-start">
            <div className="h-full w-9/12 flex items-center justify-between p-6">
              <div className="relative">
                <button type="button" onClick={() => toggleSection("All")}>
                  All
                </button>
                <BubbleCount popUpSection={"All"} topBarSection="Messages" />
              </div>
              <div className="relative">
                <button type="button" onClick={() => toggleSection("Unread")}>
                  Unread
                </button>
                <BubbleCount popUpSection={"Unread"} topBarSection="Messages" />
              </div>
              <div className="relative">
                <button type="button" onClick={() => toggleSection("Read")}>
                  Read
                </button>
                <BubbleCount popUpSection={"Read"} topBarSection="Messages" />
              </div>
            </div>
          </div>
          <div className="h-auto w-full bg-slate-100 px-6">
            <div
              className={`h-[0.15rem] w-2/12 bg-[#7d1f2e] ${popUpSlider} transition duration-300`}
            ></div>
          </div>
        </div>
        <PopUpCards popUpSection={popUpSection} topBarSection="Messages" />
      </div>
      {/* Notification */}
      <div
        id="popup"
        className={`topbarPopup h-[28rem] w-[25rem] flex-col items-center justify-start text-black bg-[#fefefe] border rounded-2xl mr-8 ${
          isPopUpOpen2 ? "flex" : "hidden"
        }`}
      >
        <div className="h-[2.5rem] w-full flex items-center justify-between p-6">
          <h1 className=" font-bold tracking-wider">Notifications</h1>
          <div className="flex items-center justify-center gap-4">
            <AiOutlineSetting className="cursor-pointer" />
            <AiOutlineClose className="cursor-pointer" onClick={closePopUp} />
          </div>
        </div>
        <div className="h-[2.5rem] w-full flex flex-col items-center justify-center">
          <div className="h-full w-full flex items-center justify-start">
            <div className="h-full w-9/12 flex items-center justify-between p-6">
              <div className="relative">
                <button type="button" onClick={() => toggleSection("All")}>
                  All
                </button>
                <BubbleCount
                  popUpSection={"All"}
                  topBarSection="Notifications"
                />
              </div>
              <div className="relative">
                <button type="button" onClick={() => toggleSection("Unread")}>
                  Unread
                </button>
                <BubbleCount
                  popUpSection={"Unread"}
                  topBarSection="Notifications"
                />
              </div>
              <div className="relative">
                <button type="button" onClick={() => toggleSection("Read")}>
                  Read
                </button>
                <BubbleCount
                  popUpSection={"Read"}
                  topBarSection="Notifications"
                />
              </div>
            </div>
          </div>
          <div className="h-auto w-full bg-slate-100 px-6">
            <div
              className={`h-[0.15rem] w-2/12 bg-[#7d1f2e] ${popUpSlider} transition duration-300`}
            ></div>
          </div>
        </div>
        <PopUpCards popUpSection={popUpSection} topBarSection="Notifications" />
      </div>
      {/* User Menu */}
      <div
        className={`popup h-[28rem] w-[25rem] flex-col items-center justify-center text-black bg-[#fefefe] border rounded-2xl mr-8 ${
          isPopUpOpen3 ? "flex" : "hidden"
        }`}
      >
        <div className="h-[2.5rem] w-full flex items-center justify-between p-6">
          <h1 className=" font-bold tracking-wider">User Account</h1>
          <div className="flex items-center justify-center gap-4">
            <AiOutlineSetting className="cursor-pointer" />
            <AiOutlineClose className="cursor-pointer" onClick={closePopUp} />
          </div>
        </div>
        <div className="h-1/6 w-full flex flex-col items-start justify-center"></div>

        <div className="h-5/6 w-full flex flex-col items-start justify-center gap-2">
          <Link
            href={"/dashboard"}
            className="h-8 w-full flex items-center justify-start gap-4 p-4"
          >
            <MdDashboard />
            <div>Dashboard</div>
          </Link>
          <Link
            href={"/forgotPassword"}
            className="h-8 w-full flex items-center justify-start gap-4 p-4"
          >
            <FaUserLock />
            <div>Reset Password</div>
          </Link>
          <Link
            href={"/login"}
            className="h-8 w-full flex items-center justify-start gap-4 p-4"
          >
            <MdLogout />
            <button
              type="button"
              onClick={() => {
                logout();
              }}
            >
              Sign Out
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Popup;
