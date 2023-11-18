"use client";

// react components
import React, { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
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
  const [selectMonth, setSelectMonth] = useState(false);
  const [selectView, setSelectView] = useState(false);
  const [labelView, setLabelView] = useState(false);
  const [viewList, setViewList] = useState("today");
  const [changeDateColor, setChangeDateColor] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<number>(0);
  const [selectYear, setSelectYear] = useState(new Date().getFullYear());
  const [selectedMonthView, setSelectedMonthView] = useState<{
    month: number;
    year: number;
  } | null>(null);

  const generateYearRange = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(i);
    }
    return years;
  };

  const handleMonthView = (index: number) => {
    // Calculate the month offset from the current month
    const monthOffset = index - 5;

    // Calculate the month to display
    const displayDate = today.add(monthOffset, "month");
    const selectedMonthYear = {
      month: displayDate.month() + 1, // Adding 1 because months are zero-indexed in Moment.js
      year: displayDate.year(),
    };

    console.log(
      `${displayDate.format("MMMM")} ${displayDate.format("YYYY")} clicked`
    );
    setSelectedMonthView(selectedMonthYear);

    // Set today to the selected month and year
    setToday(displayDate);
  };

  const handleBackClick = () => {
    setCurrentMonth((prevMonth) => prevMonth - 1);
  };

  const handleForwardClick = () => {
    setCurrentMonth((prevMonth) => prevMonth + 1);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const closePopupsOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".calendarArea") &&
        !target.closest(".viewPopUp") &&
        !target.closest(".labelPopUp") &&
        !target.closest(".monthList")
      ) {
        setSelectDate(currentDate);
        setToday(currentDate);
        setSelectView(false);
        setSelectMonth(false);
        setChangeDateColor(false);
        setCurrentMonth(0);
        setLabelView(false);
      }
    };
    document.addEventListener("click", closePopupsOnOutsideClick);
    return () => {
      document.removeEventListener("click", closePopupsOnOutsideClick);
    };
  }, [setSelectDate, setSelectView]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  return (
    <div className="h-[57rem] w-full flex items-center justify-between p-8">
      <div className="h-full w-9/12 flex flex-col items-center justify-start gap-8 border-r">
        {/* top section */}
        <div className="relative w-full flex items-start justify-between">
          <div className="w-1/6 flex flex-col items-start justify-center gap-3">
            <h1 className="text-xl font-semibold">
              {selectDate.toDate().toDateString()}
            </h1>
            <div className="monthList h-12 w-40 flex items-center justify-center">
              <div className="h-full w-7/12 flex items-center justify-start gap-4">
                <button
                  onClick={() => {
                    setSelectDate(currentDate),
                      setChangeDateColor(false),
                      setToday(currentDate);
                    setCurrentMonth(0);
                  }}
                  className="h-auto w-full flex items-center justify-center text-sm font-semibold bg-[#f4a645] py-2 rounded-md uppercase"
                >
                  {viewList === "today" ? (
                    <span>Day/Week</span>
                  ) : viewList === "month" ? (
                    "Month"
                  ) : (
                    "Year"
                  )}
                </button>
              </div>
              <div className="h-full w-5/12 flex items-center justify-start gap-4">
                <IoChevronBack
                  onClick={() => {
                    if (viewList === "today") {
                      setSelectDate(selectDate.subtract(1, "day"));
                      setToday(selectDate.subtract(1, "day"));
                    } else if (viewList === "month") {
                      setToday(today.month(today.month() - 1));
                    }
                  }}
                  className="text-2xl cursor-pointer"
                />
                <IoChevronForward
                  onClick={() => {
                    if (viewList === "today") {
                      setSelectDate(selectDate.add(1, "day"));
                      setToday(selectDate.add(1, "day"));
                    } else if (viewList === "month") {
                      setToday(today.month(today.month() + 1));
                    }
                  }}
                  className="text-2xl cursor-pointer"
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => (setSelectMonth(!selectMonth), setCurrentMonth(0))}
            className="monthList w-4/6 flex items-center justify-center gap-4"
          >
            <h1 className="text-3xl font-semibold">
              {months[today.month()]}, {today.year()}
            </h1>
            <FaChevronDown className="text-xl" />
          </button>
          <div className="w-1/6 flex items-start justify-center gap-4">
            <HiOutlineViewGridAdd
              onClick={() => setSelectView(!selectView)}
              className="viewPopUp text-2xl cursor-pointer"
            />
            <FaListUl
              onClick={() => setLabelView(!labelView)}
              className="viewPopUp text-2xl cursor-pointer"
            />
          </div>
          <div
            className={`viewPopUp absolute top-10 right-20 h-26 w-28 ${
              selectView ? "flex" : "hidden"
            } items-start justify-start text-[#fefefe] text-lg font-medium p-2 bg-[#7d1f2d] rounded-md shadow-md z-10`}
          >
            <ul className="flex flex-col items-start justify-center gap-4">
              <li
                onClick={() => (setViewList("today"), setSelectView(false))}
                className="w-full hover:text-[#e7e7e7] cursor-pointer"
              >
                Day/Week
              </li>
              <li
                onClick={() => (setViewList("month"), setSelectView(false))}
                className="w-full hover:text-[#e7e7e7] cursor-pointer"
              >
                Month
              </li>
              <li
                onClick={() => (setViewList("year"), setSelectView(false))}
                className="w-full hover:text-[#e7e7e7] cursor-pointer"
              >
                Year
              </li>
            </ul>
          </div>
          <div
            className={`labelPopUp absolute top-10 right-10 h-26 w-40 ${
              labelView ? "flex" : "hidden"
            } items-start justify-start text-[#fefefe] text-lg font-medium p-2 bg-[#7d1f2d] rounded-md shadow-md z-10`}
          >
            <ul className="flex flex-col items-start justify-center gap-4">
              <li
                // onClick={() => (setViewList("today"), setSelectView(false))}
                className="w-full hover:text-[#e7e7e7] cursor-pointer"
              >
                Lectures
              </li>
              <li
                // onClick={() => (setViewList("month"), setSelectView(false))}
                className="w-full hover:text-[#e7e7e7] cursor-pointer"
              >
                Workshops
              </li>
              <li
                // onClick={() => (setViewList("year"), setSelectView(false))}
                className="w-full hover:text-[#e7e7e7] cursor-pointer"
              >
                Meetings
              </li>
              <li
                // onClick={() => (setViewList("month"), setSelectView(false))}
                className="w-full hover:text-[#e7e7e7] cursor-pointer"
              >
                Office Hours
              </li>
              <li
                // onClick={() => (setViewList("year"), setSelectView(false))}
                className="w-full hover:text-[#e7e7e7] cursor-pointer"
              >
                Holidays
              </li>
              <li
                // onClick={() => (setViewList("year"), setSelectView(false))}
                className="w-full hover:text-[#e7e7e7] cursor-pointer"
              >
                Exam Periods
              </li>
            </ul>
          </div>
        </div>

        {/* search bar */}
        <div
          className={`relative h-1/6 w-full flex items-center justify-center overflow-hidden`}
        >
          <div
            className={`w-full flex items-center justify-start ${
              selectMonth ? "translate-x-[-50%] delay-300" : "translate-x-0"
            } transition-all duration-1000 ease-in-out`}
          >
            <div className="flex items-center justify-center text-[#fff] bg-[#7d1f2d] p-2 rounded-md">
              <input
                type="text"
                id="search"
                name="search"
                autoComplete="off"
                value={searchValue}
                placeholder="Search Events"
                onChange={handleSearchChange}
                className="h-10 w-full flex items-center justify-center p-2 bg-transparent placeholder:text-white/80 outline-none"
              />
              <IoMdSearch className="text-2xl" />
            </div>
          </div>
          {/* Switch between months */}
          <div
            className={`monthList absolute h-full w-auto flex items-center justify-start p-2 ${
              selectMonth ? "translate-x-0" : "translate-x-[200%]"
            } transition-all duration-[1500ms] ease-in-out`}
          >
            <div className="absolute top-0 left-[17rem] h-full w-16 flex items-center justify-center bg-slate-100/50">
              <IoChevronBack
                onClick={handleBackClick}
                className="text-4xl cursor-pointer"
              />
            </div>
            {Array.from({ length: 12 }).map((_, index) => {
              // Calculate the month offset from the current month
              const monthOffset = index - 5;

              // Calculate the month to display
              const displayDate = today.add(
                currentMonth + monthOffset,
                "month"
              );
              const displayMonth = displayDate.format("MMMM");
              const displayYear = displayDate.format("YYYY");

              return (
                <button
                  key={index}
                  onClick={() => handleMonthView(index)}
                  className={` h-[90%] w-32 m-2 flex flex-col items-center justify-center text-lg ${
                    monthOffset === 0
                      ? "bg-[#7d1f2d] text-white"
                      : "bg-[#fefefe] text-black"
                  } font-semibold rounded-lg hover:bg-[#7d1f2d] shadow-lg hover:text-white transition-colors duration-500`}
                >
                  {displayMonth}
                  <span className="text-base">{displayYear}</span>
                </button>
              );
            })}
            <div className="absolute top-0 right-[17rem] h-full w-16 flex items-center justify-center bg-slate-100/50">
              <IoChevronForward
                onClick={handleForwardClick}
                className="text-4xl cursor-pointer"
              />
            </div>
          </div>
        </div>
        {/* Calendar & Schedule  */}
        <div className="calendarArea h-4/6 w-full flex items-center justify-start -mt-4">
          {viewList === "year" ? (
            <div className="h-[35rem] w-7/12 flex flex-col items-start justify-start border-r">
              <div className="h-1/6 w-[95%] grid grid-cols-7"></div>
              <div className="h-5/6 w-[95%] grid grid-cols-7">
                {generateYearRange().map((year, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center border-t"
                  >
                    <h1
                      onClick={() => {
                        setSelectYear(year);
                        setSelectDate(dayjs(`${year}-01-01`));
                        setToday(dayjs(`${year}-01-01`));
                        setViewList("today");
                      }}
                      className={`h-20 w-20 flex items-center justify-center ${
                        selectYear === year
                          ? "bg-[#7d1f2d] text-[#fefefe]"
                          : "bg-[#545454] text-[#f8f8f8]"
                      } text-xl hover:bg-[#7d1f2d] transition-all hover:text-[#fff] rounded-full cursor-pointer`}
                    >
                      {year}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-[35rem] w-7/12 flex flex-col items-start justify-start border-r">
              <div className="h-1/6 w-[95%] grid grid-cols-7">
                {days.map((date, index) => {
                  return (
                    <h1
                      key={index}
                      className="flex items-center justify-center font-semibold text-[#792632]"
                    >
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
                            setSelectDate(date),
                              !today
                                ? setChangeDateColor(true)
                                : setChangeDateColor(false);
                          }}
                          className={`h-10 w-10 flex items-center justify-center ${
                            today && !changeDateColor
                              ? "bg-[#7d1f2d] text-[#f8f8f8]"
                              : today &&
                                changeDateColor &&
                                "bg-[#545454] text-[#f8f8f8]"
                          } text-xl ${
                            currentMonth ? "text-[#49161d]" : "text-[#7e4602]"
                          }
                        ${
                          selectDate.toDate().toDateString() ===
                            date.toDate().toDateString() &&
                          "bg-[#7d1f2d] text-[#fefefe]"
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
          )}
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
