"use client";

// react components
import React from "react";

// global states
import usePopUpStore from "@/globalStates/globalPopUp";

// components
import NotificationList from "./NotificationList";

type Props = {};

const NotificationPopup = (props: Props) => {
  const { isPopUpOpen2 } = usePopUpStore();
  return (
    <div
      id="popup2"
      className={`h-96 w-80 flex flex-col items-center justify-center text-[#000] bg-[#fefefe] rounded-xl border border-orange-700`}
      // ${
      //   isPopUpOpen2 ? "translate-y-0" : "translate-y-[-150%]"
      // } transition duration-300 ease-in-out
    >

      <div className="h-full w-full flex items-center justify-center border-b-[1px] border-slate-100">
        <NotificationList />
      </div>
      <div className="h-[2.5rem] w-full flex items-center justify-between text-sm p-4">
        <div className="cursor-pointer">See all</div>
        <div className="cursor-pointer">Clear</div>
      </div>
    </div>
  );
};

export default NotificationPopup;
