"use client";

// react components
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// global states
import { globalSideBar } from "../../globalStates/globalSideBar";

//components
import { useAuth } from "@/context/AuthContext";

type Props = {};

const Dashboard = (props: Props) => {
  const { isSidebarOpen, isSidebarHidden } = globalSideBar();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  return (
    <div
      className={`fixed bottom-0 right-0 h-[calc(100%-5rem)] p-8 ${
        isSidebarOpen && isSidebarHidden
          ? "w-screen lg:w-[calc(100%-12rem)]"
          : !isSidebarOpen && !isSidebarHidden
          ? "w-screen"
          : !isSidebarOpen &&
            isSidebarHidden &&
            "w-screen lg:w-[calc(100%-5rem)]"
      } flex items-center justify-center gap-8 transition-width duration-500`}
    >
      <div className="h-full w-1/5 flex flex-col items-center justify-center gap-8">
        <div className="h-3/4 w-full flex flex-col items-center justify-center border border-slate-300 rounded-lg"></div>
        <div className="h-1/4 w-full flex flex-col items-center justify-center border border-slate-300 rounded-lg"></div>
      </div>
      <div className="h-full w-2/6 flex flex-col items-center justify-center gap-4">
        <div className="h-5/6 w-full grid grid-cols-2 grid-rows-2 gap-4">
          <div className="h-full w-full flex items-center justify-center border border-slate-300 rounded-lg"></div>
          <div className="h-full w-full flex items-center justify-center border border-slate-300 rounded-lg"></div>
          <div className="h-full w-full flex items-center justify-center border border-slate-300 rounded-lg"></div>
          <div className="h-full w-full flex items-center justify-center border border-slate-300 rounded-lg"></div>
        </div>
        <div className="h-full w-full flex items-center justify-center border border-slate-300"></div>
      </div>
      <div className="h-full w-1/5 flex flex-col items-center justify-center gap-8">
        <div className="h-3/4 w-full flex flex-col items-center justify-center border border-slate-300 rounded-lg"></div>
        <div className="h-1/4 w-full flex flex-col items-center justify-center border border-slate-300 rounded-lg"></div>
      </div>
    </div>
  );
};

export default Dashboard;
