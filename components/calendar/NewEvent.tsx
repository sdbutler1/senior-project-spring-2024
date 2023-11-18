"use client";

// react components
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import dayjs from "dayjs";
import { db } from "@/config/firebase";
import { collection, doc, addDoc } from "firebase/firestore";

// global states
import { useGlobalAlert } from "@/globalStates/useGlobalAlert";

// components
import { useAuth } from "@/context/AuthContext";

type Props = {};

type FormData = {
  eventName: string;
  selectedDate: Date | null;
  selectedTime: Date | null;
  addNote: string;
  selectedLabel: keyof typeof labels;
};

const labels = {
  lectures: "0000FF", // Blue
  workshops: "FFA500", // Orange
  meetings: "800080", // Purple
  "Office Hours": "FFFF00", // Yellow
  holidays: "808080", // Gray
  "Exam Periods": "006400", // Dark Green
};

const NewEvent = (props: Props) => {
  const { user } = useAuth();
  const { setTranslateAlert } = useGlobalAlert();
  const [newEvent, setNewEvent] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    eventName: "",
    selectedDate: new Date(),
    selectedTime: new Date(),
    addNote: "",
    selectedLabel: "lectures",
  });

  const [previousDate, setPreviousDate] = useState<Date | null>(null);
  const [selectDateModal, setSelectDateModal] = useState(false);
  const [previousTime, setPreviousTime] = useState<Date | null>(null);
  const [selectTimeModal, setSelectTimeModal] = useState(false);

  const cancelSchedule = () => {
    setNewEvent(false);
    setFormData({
      eventName: "",
      selectedDate: null,
      selectedTime: null,
      addNote: "",
      selectedLabel: "lectures",
    });
  };

  const handleEventNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      eventName: event.target.value,
    });
  };

  const handleAddNoteChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      addNote: event.target.value,
    });
  };

  const handleDateChange = (newDate: Date | null) => {
    setFormData({
      ...formData,
      selectedDate: newDate,
    });
  };

  const handleTimeChange = (newTime: Date | null) => {
    setFormData({
      ...formData,
      selectedTime: newTime,
    });
  };

  const handleLabelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      selectedLabel: event.target.value as keyof typeof labels,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const { eventName, selectedDate, selectedTime, addNote, selectedLabel } =
        formData;

      if (!eventName || !selectedDate || !selectedTime) {
        // Handle form validation here
        setTranslateAlert(true, "Please fill in all required fields", "error");
        return;
      }

      // Format selectedDate to dd, mm, yy format
      const formattedDate = dayjs(selectedDate).format("DD/MM/YYYY");

      // Format selectedTime to 24-hour clock format
      const formattedTime = dayjs(selectedTime).format("HH:mm:ss");

      const data = {
        eventName,
        selectedDate: formattedDate,
        selectedTime: formattedTime,
        addNote,
        selectedLabel,
      };

      // Reference to the user's document
      const userDocRef = doc(collection(db, "authEvents"), user.uid);

      // Reference to the "schedules" collection within the user's document
      const schedulesCollectionRef = collection(userDocRef, "schedules");

      // Add a new document to the "schedules" collection
      await addDoc(schedulesCollectionRef, data);

      setTranslateAlert(true, "Event was created successfully.", "success");
    } catch (e) {
      setTranslateAlert(true, "Unable to create event. Try again", "error");
      console.log(e);
    }

    // Clear the form after submission
    setTimeout(() => {
      window.location.reload();
      setNewEvent(false);
      setFormData({
        eventName: "",
        selectedDate: null,
        selectedTime: null,
        addNote: "",
        selectedLabel: "lectures",
      });
    }, 2000);
  };

  const handleDateCancel = () => {
    if (previousDate !== null) {
      setFormData({
        ...formData,
        selectedDate: previousDate,
      });
    }
    setSelectDateModal(false);
  };

  const handleTimeCancel = () => {
    if (previousTime !== null) {
      setFormData({
        ...formData,
        selectedTime: previousTime,
      });
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
        <form
          onSubmit={handleSubmit}
          className="h-full w-full flex flex-col items-center justify-start gap-12 p-2 text-sm uppercase"
        >
          <div className="w-full flex flex-col items-start justify-center gap-2">
            <label htmlFor="eventName">Event Name</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              autoComplete="off"
              value={formData.eventName || ""}
              onChange={handleEventNameChange}
              className="w-full bg-transparent border-b border-gray-300 outline-none"
            />
          </div>
          <div className="flex items-start justify-center gap-8">
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <label htmlFor="date">Date</label>
              <input
                type="text"
                id="date"
                name="date"
                value={
                  formData.selectedDate
                    ? dayjs(formData.selectedDate).format("ddd, MMM DD YYYY")
                    : ""
                }
                onChange={() => {}}
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
                id="time"
                name="time"
                value={
                  formData.selectedTime
                    ? dayjs(formData.selectedTime).format("HH:mm")
                    : ""
                }
                onChange={() => {}}
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
                name="addNote"
                value={formData.addNote || ""}
                onChange={handleAddNoteChange}
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
                style={{
                  backgroundColor: `#${labels[formData.selectedLabel]}`,
                }}
                className="h-4 w-4 rounded-full"
              ></div>
              <select
                id="eventLabel"
                name="eventLabel"
                className="w-full bg-transparent outline-none"
                onChange={handleLabelChange}
                value={formData.selectedLabel || ""}
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
              type="submit"
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
