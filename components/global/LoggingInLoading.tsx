"use client";
// react components
import React from "react";
import Image from "next/image";

// components

// global states
import { useGlobalLoading } from "@/globalStates/useGlobalLoading";

// assets
import loadingGif from "@/public/assets/loading.gif";

type Props = {};

const LoggingInLoading = () => {
  const { loading2 } = useGlobalLoading();

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-screen flex-col items-center justify-center gap-12 bg-[#ac824a] z-50 ${
        loading2 ? "flex" : "hidden"
      }`}
    >
      <div className="h-auto w-auto flex items-center justify-center">
        <h1 className="text-4xl text-white font-semibold">LOADING</h1>
        <div className="h-[55%] w-auto flex items-end justify-center">
          <div className="h-2 w-2 bg-white animate-pulse border rounded-full ml-2"></div>
          <div className="h-2 w-2 bg-white animate-pulse border rounded-full ml-2"></div>
          <div className="h-2 w-2 bg-white animate-pulse border rounded-full ml-2"></div>
        </div>
      </div>
      <Image src={loadingGif} alt="Loading" className="h-auto w-60" />
    </div>
  );
};

export default LoggingInLoading;
