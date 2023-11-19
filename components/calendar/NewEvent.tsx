"use client";

// react components
import React, { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import { collection, doc, addDoc } from "firebase/firestore";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// global states
import { useGlobalAlert } from "@/globalStates/useGlobalAlert";

// components
import { useAuth } from "@/context/AuthContext";

type FormData = {
  eventName: string;
  selectedDate: Date | null | string;
  selectedTime: Date | null | string;
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

type Props = {};

const NewEvent = (props: Props) => {
  const { user } = useAuth();
  const { setTranslateAlert } = useGlobalAlert();
  const [newEvent, setNewEvent] = useState(false);
  const [timeFocus, setTimeFocus] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    eventName: "",
    selectedDate: new Date(),
    selectedTime: new Date(),
    addNote: "",
    selectedLabel: "lectures",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedDate: date,
    }));
  };

  const handleTimeChange = (time: string) => {
    const selectedTime = dayjs.tz(time, "HH:mm", "auto");

    // Ensure formData.selectedDate is a Date object
    const selectedDate =
      formData.selectedDate instanceof Date
        ? formData.selectedDate
        : new Date();

    const newSelectedTime = new Date(selectedDate);
    newSelectedTime.setHours(selectedTime.hour());
    newSelectedTime.setMinutes(selectedTime.minute());
    newSelectedTime.setSeconds(0);
    newSelectedTime.setMilliseconds(0);

    // Format the time string before setting it in the state
    const formattedTime = dayjs(newSelectedTime).format("HH:mm");

    setFormData((prevData) => ({
      ...prevData,
      selectedTime: newSelectedTime,
    }));

    // Set the formatted time in the input
    document.getElementById("timeInput")?.setAttribute("value", formattedTime);
  };

  const cancelSchedule = () => {
    setNewEvent(false);
    setFormData({
      eventName: "",
      selectedDate: new Date(),
      selectedTime: new Date(),
      addNote: "",
      selectedLabel: "lectures",
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

      const data = {
        eventName,
        selectedDate,
        selectedTime,
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
        selectedDate: new Date(),
        selectedTime: new Date(),
        addNote: "",
        selectedLabel: "lectures",
      });
    }, 2000);
  };

  useEffect(() => {
    const closePopupsOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".timeInput")) {
        setTimeFocus(false);
      }
    };
    document.addEventListener("click", closePopupsOnOutsideClick);
    return () => {
      document.removeEventListener("click", closePopupsOnOutsideClick);
    };
  }, []);

  return (
    <div className="h-full w-full sm:w-5/12 2xl:w-3/12 flex flex-col items-center justify-start gap-12 pt-4">
      <button
        type="button"
        onClick={() => setNewEvent(true)}
        className="h-12 w-40 flex items-center justify-center text-lg text-[#fff] font-semibold bg-[#7d1f2e] rounded hover:bg-[#701b29] hover:scale-[102%]"
      >
        Schedule
      </button>
      <form
        onSubmit={handleSubmit}
        className={`h-5/6 w-11/12 ${
          newEvent ? "flex" : "hidden"
        } flex flex-col items-start justify-start gap-8 p-4 uppercase`}
      >
        <div className="w-full flex flex-col items-start justify-center border-b border-gray-300">
          <label>Event Name</label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            className="w-full bg-transparent outline-none -ml-2"
          />
        </div>
        <div className="w-full flex items-start justify-center gap-4">
          <div className="w-full flex flex-col items-start justify-center">
            <label>Date</label>
            <input
              type="date"
              name="selectedDate"
              onChange={(e) => handleDateChange(new Date(e.target.value))}
              value={
                formData.selectedDate instanceof Date
                  ? formData.selectedDate.toISOString().split("T")[0]
                  : formData.selectedDate ?? ""
              }
              className="w-full bg-transparent outline-none -ml-2 cursor-pointer"
            />
          </div>
          <div className="w-full flex flex-col items-start justify-center">
            <label>Time</label>
            <input
              type="time"
              pattern="[0-9]{2}:[0-9]{2}"
              minLength={5}
              maxLength={5}
              value={
                !timeFocus && formData.selectedTime instanceof Date
                  ? dayjs(formData.selectedTime).format("HH:mm")
                  : undefined
              }
              onChange={(e) => handleTimeChange(e.target.value)}
              onFocus={() => setTimeFocus(true)}
              className="timeInput w-full bg-transparent outline-none -ml-2 cursor-pointer"
            />
          </div>
        </div>
        <div className="w-full flex flex-col items-start justify-center">
          <label htmlFor="addNote">Add Note</label>
          <div className="notepadLines">
            <textarea
              id="addNote"
              name="addNote"
              value={formData.addNote}
              onChange={handleChange}
              className="w-full h-28 px-2 bg-transparent outline-none resize-none"
            />
          </div>
        </div>
        <div className="w-full flex flex-col items-start justify-center">
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
              className="w-full bg-transparent outline-none cursor-pointer"
              value={formData.selectedLabel}
              onChange={handleChange}
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
            className={`h-10 w-32 flex items-center justify-center text-[#000] font-semibold bg-[#dcdcdc] rounded-3xl hover:bg-[#a7a7a7] hover:scale-[102%]`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`h-10 w-32 flex items-center justify-center text-[#fff] font-semibold bg-[#7d1f2e] rounded-3xl hover:bg-[#701b29] hover:scale-[102%]`}
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewEvent;
