"use client";

// react components
import React  from "react";
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
  const { user } = useAuth();
  const currentPathname = usePathname();
  const allowedPages = [
    "/",
    "/dashboard",
    "/student",
    "/calendar",
    "/userProfile",
  ];

  const { isSidebarOpen, isSidebarHidden } = useGlobalSideBar();
  
  if (currentPathname === "/login" || currentPathname === "/forgotPassword") {
    return <>{children}</>;
  }

  return (
    <div
      className={`h-[calc(100%-5rem)] ${
        isSidebarOpen && isSidebarHidden // open full
          ? "w-full lg:w-[calc(100%-16rem)] ml-0 lg:ml-64"
          : !isSidebarOpen && isSidebarHidden // open minimized
          ? "w-full lg:w-[calc(100%-5rem)] ml-0 lg:ml-20"
          : !isSidebarOpen && !isSidebarHidden && "w-full" // closed
      }
        ${
          user ? "flex" : "hidden"
        } flex-col items-start justify-start mt-20 transition-width duration-700`}
    >
      <NavPageLoading />
      {allowedPages.includes(currentPathname) && user ? <TopBar /> : null}
      <PopUp />
      <Help />
      <TimeoutPopup />
      {allowedPages.includes(currentPathname) && user ? <SideBar /> : null}
      {children}
    </div>
  );
}

export default PageWrapper;
