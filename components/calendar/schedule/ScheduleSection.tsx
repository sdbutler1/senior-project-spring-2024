"use client";

// react components
import React, { useState } from "react";

// components
import { useAuth } from "@/context/AuthContext";
import BubbleCount from "@/components/calendar/schedule/BubbleCount";
import ScheduleCard from "@/components/calendar/schedule/ScheduleCard";

// assets

// icons

type Props = {};

const ScheduleSection = (props: Props) => {
  const { user } = useAuth();
  const [slideSection, setSlideSection] = useState("");

  const toggleSection = (section: string) => {
    setSlideSection(section);
  };

  return (
    <div className="h-full w-full flex flex-col items-start justify-start gap-4">
      <h1 className="text-2xl font-bold tracking-wider">Schedule</h1>
      <div className="h-[2.5rem] w-full flex flex-col items-center justify-center">
        <div className="h-full w-full flex items-center justify-start">
          <div className="h-full w-full flex items-center justify-between p-6">
            <div className="relative">
              <button type="button" onClick={() => toggleSection("all")}>
                All
              </button>
              <BubbleCount popUpSection={"all"} />
            </div>
            <div className="relative">
              <button type="button" onClick={() => toggleSection("today")}>
                Today
              </button>
              <BubbleCount popUpSection={"today"} />
            </div>
            <div className="relative">
              <button type="button" onClick={() => toggleSection("week")}>
                Week
              </button>
              <BubbleCount popUpSection={"week"} />
            </div>
            <div className="relative">
              <button type="button" onClick={() => toggleSection("month")}>
                Month
              </button>
              <BubbleCount popUpSection={"month"} />
            </div>
          </div>
        </div>
        <div className="h-4 w-full bg-slate-200">
          <div
            className={`h-[0.15rem] w-[5rem] bg-[#7d1f2e] ${
              (slideSection === "all" && "translate-x-0") ||
              (slideSection === "today" && "translate-x-[7rem]") ||
              (slideSection === "week" && "translate-x-[15rem]") ||
              (slideSection === "month" && "translate-x-[23.3rem]")
            } transition duration-300`}
          ></div>
        </div>
      </div>
      <ScheduleCard popUpSection={slideSection} />
    </div>
  );
};

export default ScheduleSection;
