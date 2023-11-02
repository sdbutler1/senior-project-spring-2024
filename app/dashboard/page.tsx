"use client";

// react components
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

// global states
import { globalSideBar } from "../../globalStates/globalSideBar";

//components
import { useAuth } from "@/context/AuthContext";

// assets
import { StudentData } from "@/app/student/studentData";

type Props = {
};

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
      className={`absolute bottom-0 right-0 h-[calc(100%-5rem)] p-8 ${
        isSidebarOpen && isSidebarHidden
          ? "w-screen lg:w-[calc(100%-12rem)]"
          : !isSidebarOpen && !isSidebarHidden
          ? "w-screen"
          : !isSidebarOpen &&
            isSidebarHidden &&
            "w-screen lg:w-[calc(100%-5rem)]"
      } flex items-center justify-center gap-8 transition-width duration-500`}
    >
      <div className="h-full w-1/5 flex flex-col items-center justify-center"></div>
    </div>
  );
};

export default Dashboard;
