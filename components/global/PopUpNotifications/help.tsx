"use client";

// react components
import React from "react";
import { usePathname } from "next/navigation";

// icons
import { AiOutlineClose, AiOutlineSetting } from "react-icons/ai";

// global states
import usePopUpStore from "@/globalStates/globalPopUp";

type Props = {};

const Help = (props: Props) => {
  const currentPathname = usePathname();

  const { isPopUpOpen2, setPopUpOpen2 } = usePopUpStore();

  const closePopUp = () => {
    setPopUpOpen2(false);
  };

  if (currentPathname === "/login" || currentPathname === "/forgotPassword") {
    return null;
  }

  return (
    <div
      id="popup"
      className={`topbarPopup absolute top-60 left-[40%] h-[40rem] w-[40rem] flex-col items-center justify-start gap-2 text-black bg-[#fefefe] border rounded-2xl mr-8 ${
        isPopUpOpen2 ? "flex" : "hidden"
      }`}
    >
      <div className="h-[2.5rem] w-full flex items-center justify-between p-6">
        <h1 className="text-xl font-bold tracking-wider">Help</h1>
        <div className="flex items-center justify-center gap-4">
          <AiOutlineSetting className="cursor-pointer" />
          <AiOutlineClose className="cursor-pointer" onClick={closePopUp} />
        </div>
      </div>
      <form className="h-full w-11/12 flex flex-col items-center justify-start gap-4 text-[14px] font-semibold">
        <div className="h-auto w-full flex items-center justify-center gap-10">
          <label className="h-auto w-full flex flex-col items-start justify-center">
            Title
            <input className="h-12 w-full flex flex-col items-center justify-center border rounded-md" />
          </label>
          <label className="h-auto w-full flex flex-col items-start justify-center">
            Full Name
            <input className="h-12 w-full flex flex-col items-center justify-center border rounded-md" />
          </label>
        </div>
        <div className="h-auto w-full flex items-center justify-center gap-10">
          <label className="h-auto w-full flex flex-col items-start justify-center">
            Email
            <input className="h-12 w-full flex flex-col items-center justify-center border rounded-md" />
          </label>
          <label className="h-auto w-full flex flex-col items-start justify-center">
            Phone Number
            <input className="h-12 w-full flex flex-col items-center justify-center border rounded-md" />
          </label>
        </div>
        <label className="h-4/6 w-full flex flex-col items-start justify-center">
          Message
          <input className="h-full w-full flex flex-col items-center justify-center border rounded-md" />
        </label>
      </form>
      <div className="h-auto w-full flex items-center justify-center py-3">
        <button
          type="submit"
          className="h-10 w-36 flex items-center justify-center text-[#fff] font-semibold bg-[#7d1f2e] rounded hover:bg-[#701b29]"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Help;
