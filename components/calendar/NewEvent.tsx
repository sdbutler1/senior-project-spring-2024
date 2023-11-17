"use client";

// react components
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import dayjs from "dayjs";

// components

type Props = {};

const labels = {
  lectures: "0000FF", // Blue
  workshops: "FFA500", // Orange
  meetings: "800080", // Purple
  "Office Hours": "FFFF00", // Yellow
  holidays: "808080", // Gray
  "Exam Periods": "006400", // Dark Green
};

const NewEvent = (props: Props) => {
  const [newEvent, setNewEvent] = useState(false);
  const [selectedLabel, setSelectedLabel] =
    useState<keyof typeof labels>("lectures");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [previousDate, setPreviousDate] = useState<Date | null>(null);
  const [selectDateModal, setSelectDateModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [previousTime, setPreviousTime] = useState<Date | null>(null);
  const [selectTimeModal, setSelectTimeModal] = useState(false);

  const cancelSchedule = () => {
    setNewEvent(false);
    setSelectedLabel("lectures");
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectDateModal(false);
    setSelectTimeModal(false);
  };

  const handleLabelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLabel(event.target.value as keyof typeof labels);
  };

  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      setPreviousDate(selectedDate);
      setSelectedDate(newDate);
    }
  };

  const handleTimeChange = (newTime: Date | null) => {
    if (newTime) {
      setPreviousTime(selectedDate);
      setSelectedTime(newTime);
    }
  };

  const handleDateCancel = () => {
    if (previousDate !== null) {
      setSelectedDate(previousDate);
    }
    setSelectDateModal(false);
  };

  const handleTimeCancel = () => {
    if (previousTime !== null) {
      setSelectedTime(previousTime);
    }
    setSelectTimeModal(false);
  };

  return (
    <div className="h-full w-3/12 flex flex-col items-center justify-start gap-12">
      <button
        type="button"
        onClick={() => setNewEvent(true)}
        className="h-12 w-40 flex items-center justify-center text-lg text-[#fff] font-semibold bg-[#7d1f2e] rounded hover:bg-[#701b29]"
      >
        Schedule
      </button>
      <div
        className={`h-5/6 w-[22rem] ${
          newEvent ? "flex" : "hidden"
        } flex-col items-center justify-start gap-4 p-4`}
      >
        <form className="h-full w-full flex flex-col items-center justify-start gap-12 p-2 text-sm uppercase">
          <div className="w-full flex flex-col items-start justify-center gap-2">
            <label htmlFor="eventName">Event Name</label>
            <input
              type="text"
              className="w-full bg-transparent border-b border-gray-300 outline-none"
            />
          </div>
          <div className="flex items-start justify-center gap-8">
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <label htmlFor="date">Date</label>
              <input
                type="text"
                value={
                  selectedDate
                    ? dayjs(selectedDate).format("ddd, MMM DD YYYY")
                    : ""
                }
                onFocus={() => (
                  setSelectDateModal(true), setSelectTimeModal(false)
                )}
                className="w-full bg-transparent border-b border-gray-300 outline-none"
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <label htmlFor="time">Time</label>
              <input
                type="text"
                value={selectedTime ? dayjs(selectedTime).format("HH:mm") : ""}
                onFocus={() => (
                  setSelectTimeModal(true), setSelectDateModal(false)
                )}
                className="w-full bg-transparent border-b border-gray-300 outline-none"
              />
            </div>
          </div>
          {/* Time Section */}
          <div
            className={`${
              selectDateModal ? "flex" : "hidden"
            } flex-col items-center justify-center -mt-6`}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar sx={{ height: 300 }} onChange={handleDateChange} />
            </LocalizationProvider>

            <div className="w-3/6 flex items-start justify-between">
              <button
                onClick={handleDateCancel}
                type="button"
                className="hover:underline hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={() => setSelectDateModal(false)}
                type="button"
                className="hover:underline hover:scale-105"
              >
                Ok
              </button>
            </div>
          </div>
          <div
            className={`${
              selectTimeModal ? "flex" : "hidden"
            } flex-col items-center justify-center -mt-6`}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticTimePicker
                sx={{ height: 380, background: "transparent" }}
                onChange={handleTimeChange}
              />
            </LocalizationProvider>

            <div className="w-3/6 flex items-start justify-between">
              <button
                onClick={handleTimeCancel}
                type="button"
                className="hover:underline hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={() => setSelectTimeModal(false)}
                type="button"
                className="hover:underline hover:scale-105"
              >
                Ok
              </button>
            </div>
          </div>
          <div
            className={`w-full ${
              selectDateModal || selectTimeModal ? "hidden" : "flex"
            } flex-col items-start justify-center`}
          >
            <label htmlFor="addNote">Add Note</label>
            <div className="notepadLines">
              <textarea
                id="addNote"
                className="w-full h-16 px-2 bg-transparent outline-none resize-none"
              />
            </div>
          </div>
          <div
            className={`w-full ${
              selectDateModal || selectTimeModal ? "hidden" : "flex"
            } flex-col items-start justify-center gap-2`}
          >
            <label htmlFor="eventLabel">Label</label>
            <div className="w-full flex items-center justify-center p-1 border-b border-slate-300">
              <div
                style={{ backgroundColor: `#${labels[selectedLabel]}` }}
                className="h-4 w-4 rounded-full"
              ></div>
              <select
                id="eventType"
                name="eventType"
                className="w-full bg-transparent outline-none"
                onChange={handleLabelChange}
                value={selectedLabel}
              >
                {Object.keys(labels).map((label) => (
                  <option key={label} value={label}>
                    {label.charAt(0).toUpperCase() + label.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
            <button
              type="button"
              onClick={cancelSchedule}
              className={`h-10 w-32 ${
                selectDateModal || selectTimeModal ? "hidden" : "flex"
              } items-center justify-center text-[#000] font-semibold bg-[#dcdcdc] rounded-3xl hover:bg-[#a7a7a7]`}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`h-10 w-32 ${
                selectDateModal || selectTimeModal ? "hidden" : "flex"
              } items-center justify-center text-[#fff] font-semibold bg-[#7d1f2e] rounded-3xl hover:bg-[#701b29]`}
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewEvent;
