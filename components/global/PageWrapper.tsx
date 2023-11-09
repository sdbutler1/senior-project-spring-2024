"use client";

// react components
import React from "react";
import { usePathname } from "next/navigation";

// components
import PopUp from "@/components/global/PopUpNotifications/userAccount";
import Help from "@/components/global/PopUpNotifications/help";
import SideBar from "@/components/global/SideBar";
import TopBar from "@/components/global/topbar/TopBar";

// global states
import { useGlobalSideBar } from "@/globalStates/useGlobalSideBar";

function PageWrapper({ children }: { children: React.ReactNode }) {
  const currentPathname = usePathname();
  const allowedPages = ["/dashboard", "/userProfile", "/student", "/"];
  const { isSidebarOpen, isSidebarHidden } = useGlobalSideBar();

  if (currentPathname === "/login" || currentPathname === "/forgotPassword") {
    return <>{children}</>;
  }
  return (
    <>
      <div className="fixed top-0 left-0 h-auto w-full flex flex-col items-end justify-center gap-4 z-20">
        {allowedPages.includes(currentPathname) ? <TopBar /> : null}
        <div>
          <PopUp />
          <Help />
        </div>
      </div>
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
        {allowedPages.includes(currentPathname) ? <SideBar /> : null}
        {children}
      </div>
    </>
  );
}

export default PageWrapper;
