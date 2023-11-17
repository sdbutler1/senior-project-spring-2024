"use client";

// react components
import React, { useEffect, useRef, RefObject } from "react";

// icons
import { GoKebabHorizontal } from "react-icons/go";
import { MdTimer } from "react-icons/md";

// assets
import { Schedule } from "@/components/calendar/schedule/ScheduleList";

type Props = {
  popUpSection: string;
};

const ScheduleCard = (props: Props) => {
  let filteredScedule;
  const popUpRef: RefObject<HTMLDivElement> = useRef(null);

  const scrollToTop = () => {
    if (popUpRef.current) {
      popUpRef.current.scrollTop = 0;
    }
  };

  if (props.popUpSection === "all") {
    filteredScedule = Schedule;
  } else if (props.popUpSection === "today") {
    filteredScedule = Schedule.filter(
      (singleScedule) => singleScedule.type === props.popUpSection
    );
  } else if (props.popUpSection === "week") {
    filteredScedule = Schedule.filter(
      (singleScedule) => singleScedule.type === props.popUpSection
    );
  } else {
    filteredScedule = Schedule.filter(
      (singleScedule) => singleScedule.type === props.popUpSection
    );
  }

  useEffect(() => {
    const closePopupsOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".topbarPopup") && !target.closest(".popup")) {
        scrollToTop();
      }
    };
    document.addEventListener("click", closePopupsOnOutsideClick);
    return () => {
      document.removeEventListener("click", closePopupsOnOutsideClick);
    };
  }, []);

  return (
    <div
      className="popUp h-full w-full flex flex-col gap-4 overflow-y-scroll"
      ref={popUpRef}
    >
      {filteredScedule &&
        filteredScedule.map((singleSchedule) => (
          <div
            key={singleSchedule.id}
            id={`notification-${singleSchedule.id}`}
            className="h-auto w-full flex items-center justify-start bg-[#eeeeee] cursor-pointer"
          >
            <div className="h-full w-2 bg-[#d8a462] rounded-l-[0.1rem]"></div>
            <div className="h-full w-11/12 flex items-center justify-between">
              <div className="h-full w-1/6 flex items-center justify-center text-3xl">
                <span className="rounded-full bg-[#b3b3b36c] p-1">
                  <MdTimer className="text-[#631e29]" />
                </span>
              </div>
              <div className="h-full w-11/12 flex flex-col items-center justify-start gap-2 p-2">
                <div className="h-auto w-full font-semibold">
                  Schedule Title
                </div>
                <div className="h-4/6 w-full text-sm">
                  {singleSchedule.message}
                </div>
                <div className="h-auto w-full text-[0.7rem] font-semibold tracking-wide">
                  32 min
                </div>
              </div>
            </div>
            <button
              type="button"
              className="h-full w-auto flex items-start justify-center py-2"
            >
              <GoKebabHorizontal className="rotate-90" />
            </button>
          </div>
        ))}
    </div>
  );
};

export default ScheduleCard;
