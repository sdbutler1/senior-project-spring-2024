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
      className={`fixed bottom-0 right-0 h-[calc(100%-5rem)] ${
        isSidebarOpen && isSidebarHidden
          ? "w-screen lg:w-[calc(100%-12rem)]"
          : !isSidebarOpen && !isSidebarHidden
          ? "w-screen"
          : !isSidebarOpen &&
            isSidebarHidden &&
            "w-screen lg:w-[calc(100%-5rem)]"
      } flex items-center justify-center transition-width duration-500`}
    >
      Dashboard
    </div>
  );
};

export default Dashboard;
