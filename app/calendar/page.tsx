"use client";

// react components
import React, { Fragment, useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import dayjs from "dayjs";

// components
import { useAuth } from "@/context/AuthContext";
import NewEvent from "@/components/calendar/NewEvent";
import { GenerateDate, months } from "@/components/calendar/GenerateDate";
import ScheduleSection from "@/components/calendar/schedule/ScheduleSection";

// icons
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa6";
import { IoChevronForward } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
}

type Props = {};

const Calendar = (props: Props) => {
  const { user } = useAuth();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const closePopupsOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".calendarArea")) {
        setSelectDate(currentDate);
      }
    };
    document.addEventListener("click", closePopupsOnOutsideClick);
    return () => {
      document.removeEventListener("click", closePopupsOnOutsideClick);
    };
  }, [setSelectDate]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  return (
    <div className="h-[57.6rem] w-full flex items-center justify-between p-8">
      <div className="h-full w-9/12 flex flex-col items-center justify-start gap-8 border-r">
        <div className="w-full flex items-start justify-between">
          <div className="w-1/6 flex flex-col items-start justify-center gap-3">
            <h1 className="text-xl font-semibold">
              {selectDate.toDate().toDateString()}
            </h1>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  setToday(currentDate);
                }}
                className="h-auto w-auto flex items-center justify-center text-sm font-semibold bg-[#f4a645] py-2 px-4 rounded-md"
              >
                TODAY
              </button>
              <IoChevronBack
                onClick={() => {
                  setToday(today.month(today.month() - 1));
                }}
                className="text-2xl cursor-pointer"
              />
              <IoChevronForward
                onClick={() => {
                  setToday(today.month(today.month() + 1));
                }}
                className="text-2xl cursor-pointer"
              />
            </div>
          </div>
          <button className="w-4/6 flex items-center justify-center gap-4">
            <h1 className="text-3xl font-semibold">
              {months[today.month()]}, {today.year()}
            </h1>
            <FaChevronDown className="text-xl" />
          </button>
          <div className="w-1/6 flex items-start justify-center gap-4">
            <HiOutlineViewGridAdd className="text-2xl cursor-pointer" />
            <FaListUl className="text-2xl cursor-pointer" />
          </div>
        </div>
        <div className="w-full flex items-center justify-start">
          <div className="flex items-center justify-center text-[#fff] bg-[#7d1f2d] p-2 rounded-md">
            <input
              type="text"
              value={searchValue}
              placeholder="Search Events"
              onChange={handleSearchChange}
              className="h-10 w-full flex items-center justify-center p-2 bg-transparent placeholder:text-white/80 outline-none"
            />
            <IoMdSearch className="text-2xl" />
          </div>
        </div>
        <div className="calendarArea w-full flex items-center justify-start mt-12">
          <div className="h-[35rem] w-7/12 flex flex-col items-start justify-start border-r">
            <div className="h-1/6 w-[95%] grid grid-cols-7">
              {days.map((date, index) => {
                return (
                  <h1 key={index} className="flex items-center justify-center">
                    {date}
                  </h1>
                );
              })}
            </div>
            <div className="h-5/6 w-[95%] grid grid-cols-7 ">
              {GenerateDate(today.month(), today.year()).map(
                ({ date, currentMonth, today }, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-center border-t"
                    >
                      <h1
                        onClick={() => {
                          setSelectDate(date);
                        }}
                        className={`h-10 w-10 flex items-center justify-center ${
                          today && "bg-[#7d1f2d] text-[#f8f8f8]"
                        } text-xl ${
                          currentMonth ? "text-[#49161d]" : "text-[#7e4602]"
                        }
                        ${
                          selectDate.toDate().toDateString() ===
                            date.toDate().toDateString() &&
                          "bg-black text-[#fefefe]"
                        }
                      hover:bg-[#7d1f2d] transition-all hover:text-[#fff] rounded-full cursor-pointer`}
                      >
                        {date.date()}
                      </h1>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <div className="h-[35rem] w-5/12 flex flex-col items-start justify-start gap-4 p-6">
            <ScheduleSection />
          </div>
        </div>
      </div>
      <NewEvent />
    </div>
  );
};

export default Calendar;