"use client";

// react components
import React from "react";

// global states
import { globalSideBar } from "../../globalStates/globalSideBar";

type Props = {};

const Dashboard = (props: Props) => {
  const { isSidebarOpen, isSidebarHidden } = globalSideBar();
  return (
    <div
      className={`fixed bottom-0 right-0 h-[calc(100%-5rem)] ${
        isSidebarOpen && isSidebarHidden
          ? "w-[calc(100%-20rem)]"
          : !isSidebarOpen && !isSidebarHidden
          ? "w-screen"
          : !isSidebarOpen && isSidebarHidden && "w-[calc(100%-5rem)]"
      } flex items-center justify-center transition-width duration-500`}
    >
      Dashboard
    </div>
  );
};

export default Dashboard;
