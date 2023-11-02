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
    <>
      <div className="h-full w-1/5 flex flex-col items-center justify-center"></div>
    </>
  );
};

export default Dashboard;
