"use client";

// react components
import React from "react";

// components
import NotificationPopup from "./topbar/UserNotification/NotificationPopup";

// Icons
import { AiOutlineSetting, AiOutlineClose } from "react-icons/ai";

// global states
import usePopUpStore from "@/globalStates/globalPopUp";

type Props = {};

const Popup = (props: Props) => {
  const { isPopUpOpen1, isPopUpOpen2, isPopUpOpen3 } = usePopUpStore();
  return (
    <div className={`topbarPopup h-[28rem] w-[25rem] flex-col items-center justify-start text-black bg-[#fefefe] rounded-2xl mr-8 ${isPopUpOpen2 ? "flex" : "hidden"}`}>
      <div className="h-[2.5rem] w-full flex items-center justify-between p-6">
        <h1 className=" font-bold tracking-wider">Title</h1>
        <div className="flex items-center justify-center gap-4">
          <AiOutlineSetting className="cursor-pointer" />
          <AiOutlineClose className="cursor-pointer" />
        </div>
      </div>
      {/* <NotificationPopup /> */}
    </div>
  );
};

export default Popup;
