"use client";

// react components
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

// global states
import { useGlobalSideBar } from "@/globalStates/useGlobalSideBar";

// components
import PopUp from "@/components/global/PopUpNotifications/userAccount";
import Help from "@/components/global/PopUpNotifications/help";
import SideBar from "@/components/global/SideBar";
import TopBar from "@/components/global/TopBar";
import TimeoutPopup from "@/components/global/PopUpNotifications/TimoutPopup";
import NavPageLoading from "@/components/global/NavPageLoading";
import { useAuth } from "@/context/AuthContext";

function PageWrapper({ children }: { children: React.ReactNode }) {
  const { login, user } = useAuth();
  const currentPathname = usePathname();
  const allowedPages = ["/dashboard", "/userProfile", "/student", "/"];
  const { isSidebarOpen, isSidebarHidden } = useGlobalSideBar();

  if (currentPathname === "/login" || currentPathname === "/forgotPassword") {
    return <>{children}</>;
  }

  return (
    <>
      <div className="fixed top-0 left-0 h-auto w-full flex flex-col items-end justify-center gap-4 z-20">
        {allowedPages.includes(currentPathname) && user ? <TopBar /> : null}
        <div>
          <PopUp />
          <Help />
          <TimeoutPopup />
        </div>
      </div>
      <NavPageLoading />
      <div
        className={`${
          isSidebarOpen && isSidebarHidden // open full
            ? "w-full lg:ml-64 mt-[5rem] lg:w-[calc(100%-20rem)]"
            : !isSidebarOpen && !isSidebarHidden
            ? "w-full mt-[5rem]" // closed
            : !isSidebarOpen &&
              isSidebarHidden && // open minimized
              "lg:ml-20 mt-[5rem] lg:w-[calc(100%-20rem)]"
        } h-[calc(100%-10rem)] px-8 ${
          user ? "flex" : "hidden"
        } items-center justify-center gap-8 transition-width duration-500`}
      >
        {allowedPages.includes(currentPathname) && user ? <SideBar /> : null}
        {children}
      </div>
    </>
  );
}

export default PageWrapper;
