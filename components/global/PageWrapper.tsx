"use client";

// react components
import React from "react";
import { usePathname } from "next/navigation";

// global states
import { globalSideBar } from "@/globalStates/globalSideBar";

function PageWrapper({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, isSidebarHidden } = globalSideBar();
  const currentPathname = usePathname();

  if (currentPathname === '/login' || currentPathname === '/forgotPassword') {
    return <>{children}</>;
  }
  return (
    <div
      className={`${
        isSidebarOpen && isSidebarHidden // open full
          ? "w-full lg:ml-64 mt-[5rem] lg:w-[calc(100%-20rem)]"
          : !isSidebarOpen && !isSidebarHidden
          ? "mt-[5rem]" // closed
          : !isSidebarOpen &&
            isSidebarHidden && // open minimized
            "lg:ml-20 mt-[5rem] lg:w-[calc(100%-20rem)]"
      } w-screen h-[calc(100vh-10rem)] px-8 flex items-center justify-center gap-8 transition-width duration-500`}
    >
      {children}
    </div>
  );
}

export default PageWrapper;
