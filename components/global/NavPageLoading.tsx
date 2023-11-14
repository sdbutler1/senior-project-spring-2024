"use client";
// react components
import React from "react";
import Image from "next/image";

// components
import { useAuth } from "@/context/AuthContext";

// global states
import { useGlobalLoading } from "@/globalStates/useGlobalLoading";
import { useGlobalSideBar } from "@/globalStates/useGlobalSideBar";

// assets
import loadingGif from "@/public/assets/loading.gif";

type Props = {};

const NavPageLoading = () => {
  const { isSidebarOpen, isSidebarHidden } = useGlobalSideBar();
  const { loading, loading2 } = useGlobalLoading();

  return (
    <div
      className={`fixed bottom-0 right-0 ${
        isSidebarOpen && isSidebarHidden // open full
          ? "w-full lg:w-[calc(100%-16rem)]"
          : !isSidebarOpen && !isSidebarHidden
          ? "w-full" // closed
          : !isSidebarOpen &&
            isSidebarHidden && // open minimized
            "w-full lg:w-[calc(100%-5rem)]"
      } h-[calc(100%-5rem)] ${
        loading ? "flex" : "hidden"
      } flex-col items-center justify-center gap-12 bg-[#ac824a] z-10 transition-width duration-500`}
    >
      <div className="h-auto w-auto flex items-center justify-center">
        <h1 className="text-4xl text-white font-semibold">LOADING</h1>
        <div className="h-[55%] w-auto flex items-end justify-center">
          <div className="h-2 w-2 bg-white animate-pulse border rounded-full ml-2"></div>
          <div className="h-2 w-2 bg-white animate-pulse border rounded-full ml-2"></div>
          <div className="h-2 w-2 bg-white animate-pulse border rounded-full ml-2"></div>
        </div>
      </div>
      <Image src={loadingGif} alt="Loading" className="h-auto w-60" priority/>
    </div>
  );
};

export default NavPageLoading;
