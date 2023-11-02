"use client";

// react components
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// global states
import { globalSideBar } from "../../globalStates/globalSideBar";

//components
import { useAuth } from "@/context/AuthContext";

// assets
import { StudentData } from "@/app/student/studentData";

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
      className={`absolute bottom-0 right-0 h-[calc(100%-5rem)] p-8 ${
        isSidebarOpen && isSidebarHidden
          ? "w-screen lg:w-[calc(100%-12rem)]"
          : !isSidebarOpen && !isSidebarHidden
          ? "w-screen"
          : !isSidebarOpen &&
            isSidebarHidden &&
            "w-screen lg:w-[calc(100%-5rem)]"
      } flex items-center justify-center gap-8 transition-width duration-500`}
    >
      <div className="h-full w-1/5 flex flex-col items-center justify-center gap-8">
        <div className="formShadow h-3/4 w-full overflow-y-hidden hover:overflow-y-auto bg-[#7d1f2e] text-white border-2 border-[#7d1f2e]">
          <h1 className="text-lg font-bold p-2">Total Enrolment</h1>
          <div className="w-full flex flex-col items-center justify-center gap-4">
            {StudentData.map((student) => (
              <ul
                className="h-full w-full flex items-center justify-center px-4 py-1"
                key={student.bearsId}
              >
                <div className="flex flex-col items-center justify-center gap-2 text-xs">
                  <li className="h-full w-full flex items-center justify-start">
                    {student.firstName} {student.lastName}
                  </li>
                  <li className="h-full w-full flex items-center justify-start">
                    {student.email}
                  </li>
                </div>
                <li className="h-full w-full flex items-center justify-end text-xs font-bold">
                  {student.bearsId}
                </li>
              </ul>
            ))}
          </div>
        </div>
        <div className="h-1/4 w-full flex flex-col items-center justify-center border-2 border-slate-300 rounded-lg">
          <h1>Total Enrolment</h1>
        </div>
      </div>
      <div className="h-full w-5/12 flex flex-col items-center justify-center gap-4">
        <div className="h-5/6 w-full grid grid-cols-2 grid-rows-2 gap-4">
          <div className="h-full w-full flex items-center justify-center border-2 border-slate-300 rounded-lg"></div>
          <div className="h-full w-full flex items-center justify-center border-2 border-slate-300 rounded-lg"></div>
          <div className="h-full w-full flex items-center justify-center border-2 border-slate-300 rounded-lg"></div>
          <div className="h-full w-full flex items-center justify-center border-2 border-slate-300 rounded-lg"></div>
        </div>
        <div className="h-full w-full flex items-center justify-center border-2 border-slate-300"></div>
      </div>
      <div className="h-full w-1/5 flex flex-col items-center justify-center gap-8">
        <div className="h-3/4 w-full flex flex-col items-center justify-center border-2 border-slate-300 rounded-lg"></div>
        <div className="h-1/4 w-full flex flex-col items-center justify-center border-2 border-slate-300 rounded-lg"></div>
      </div>
    </div>
  );
};

export default Dashboard;
