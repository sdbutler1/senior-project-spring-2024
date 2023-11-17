"use client";

// react components
import React, { useState } from "react";

// components
import ScheduleCard from "@/components/calendar/schedule/ScheduleCard";
import BubbleCount from "@/components/calendar/schedule/BubbleCount";

// icons

type Props = {};

const ScheduleSection = (props: Props) => {
  const [popUpSection, setPopUpSection] = useState("All");
  const [popUpSlider, setPopUpSlider] = useState("translate-x-0");
  const toggleSection = (section: string) => {
    if (section === "all") {
      setPopUpSlider("-translate-x-6");
      setPopUpSection("all");
    } else if (section === "today") {
      setPopUpSlider("translate-x-[5.8rem]");
      setPopUpSection("today");
    } else if (section === "week") {
      setPopUpSlider("translate-x-[13.9rem]");
      setPopUpSection("week");
    } else if (section === "month") {
      setPopUpSlider("translate-x-[21.9rem]");
      setPopUpSection("month");
    }
  };
  return (
    <div className="h-full w-full flex flex-col items-start justify-start gap-4">
      <h1 className=" font-bold tracking-wider">Schedule</h1>
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
              <BubbleCount popUpSection={"today"}/>
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
        <div className="h-auto w-full bg-slate-200 px-6">
          <div
            className={`h-[0.15rem] ${
              popUpSection ? " w-[19%]" : " w-2/12"
            } bg-[#7d1f2e] ${popUpSlider} transition duration-300`}
          ></div>
        </div>
      </div>
      <ScheduleCard popUpSection={popUpSection}/>
    </div>
  );
};

export default ScheduleSection;
