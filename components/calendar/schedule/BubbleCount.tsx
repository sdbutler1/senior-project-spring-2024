// react components
import React from "react";

// assets
import { Schedule } from "@/components/calendar/schedule/ScheduleList";

type Props = {
  popUpSection: string;
};

const BubbleCount = (props: Props) => {
  let filteredScedule;
  let ScheduleLength;

  if (props.popUpSection === "all") {
    ScheduleLength = Schedule.length;
  } else if (props.popUpSection === "today") {
    filteredScedule = Schedule.filter(
      (singleScedule) => singleScedule.type === props.popUpSection
    );
    ScheduleLength = filteredScedule.length;
  } else if (props.popUpSection === "week") {
    filteredScedule = Schedule.filter(
      (singleScedule) => singleScedule.type === props.popUpSection
    );
    ScheduleLength = filteredScedule.length;
  } else {
    filteredScedule = Schedule.filter(
      (singleScedule) => singleScedule.type === props.popUpSection
    );
    ScheduleLength = filteredScedule.length;
  }

  return (
    <div
      className={`absolute bottom-4 ${
        props.popUpSection === "all"
          ? "left-[1.1rem]"
          : props.popUpSection === "today"
          ? "left-[2.5rem]"
          : props.popUpSection === "week"
          ? "left-[2.4rem]"
          : props.popUpSection === "month" && "left-[2.5rem]"
      } flex items-center justify-center h-[1.2rem] w-[1.2rem] text-[11px] text-white font-semibold bg-[#7d1f2e] rounded-full`}
    >
      {ScheduleLength}
    </div>
  );
};

export default BubbleCount;
