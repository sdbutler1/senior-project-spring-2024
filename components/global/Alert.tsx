"use client";

// react components
import React, { useState } from "react";

// global states
import { useGlobalAlert } from "@/globalStates/useGlobalAlert";

// icons
import { MdError } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaCircleInfo } from "react-icons/fa6";

type Props = {};

const Alert = (props: Props) => {
  const { isOpen, message, type } = useGlobalAlert();

  return (
    <div
      className={`alertShadow flex items-center justify-center text-[#fff] font-semibold px-2 rounded ${
        type === "success"
          ? "bg-[#4bc77b]"
          : type === "error"
          ? "bg-[#ee4b5c]"
          : type === "info" && "bg-[#3790b9]"
      } ${
        isOpen ? "translate-x-0" : "translate-x-[200%]"
      } z-40 shadow-md transition duration-1000 delay-100`}
    >
      <div className="h-full w-2/12 flex items-center justify-center">
        {type === "success" && <AiFillCheckCircle className="text-xl" />}
        {type === "error" && <MdError className="text-xl" />}
        {type !== "success" && type !== "error" && (
          <FaCircleInfo className="text-xl" />
        )}
      </div>
      <div className="h-full w-10/12 flex items-center justify-start pt-[2px]">
        {message}
      </div>
    </div>
  );
};

export default Alert;
