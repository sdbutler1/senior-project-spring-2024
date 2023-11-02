"use client";

// react components
import React, { useEffect } from 'react'
import { useRouter } from "next/navigation";

// global states
import { globalSideBar } from "../globalStates/globalSideBar";

//components
import { useAuth } from "@/context/AuthContext";

export default function Home() {
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
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-8">
          <h1 className="text-5xl">Respect</h1>
          <h1 className="text-5xl">Integrity</h1>
          <h1 className="text-5xl">Responsibility</h1>
          <h1 className="text-5xl">Professionalism</h1>
          <h1 className="text-5xl">Honesty</h1>
        </div>
      </div>
    </>
  );
}
