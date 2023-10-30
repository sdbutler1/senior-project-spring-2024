"use client";

// react components
import React from "react";

// global states
import { globalSideBar } from "../globalStates/globalSideBar";

//components

export default function Home() {
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
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-8">
          <h1 className="text-5xl">Respect</h1>
          <h1 className="text-5xl">Integrity</h1>
          <h1 className="text-5xl">Responsibility</h1>
          <h1 className="text-5xl">Professionalism</h1>
          <h1 className="text-5xl">Honesty</h1>
        </div>
      </div>
    </div>
  );
}
