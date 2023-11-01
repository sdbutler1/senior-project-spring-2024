"use client";

// react components
import React, { useEffect } from 'react'
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
      className={`h-screen w-screen flex items-center justify-center`}
    >
      Dashboard
    </div>
  );
};

export default Dashboard;
