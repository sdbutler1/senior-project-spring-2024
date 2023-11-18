"use client";

// react components
import React, { useEffect, useRef, RefObject, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import dayjs from "dayjs";

// components
import { useAuth } from "@/context/AuthContext";

// assets
import { db } from "@/config/firebase";

// icons
import { GoKebabHorizontal } from "react-icons/go";
import { MdTimer } from "react-icons/md";

type Props = {
  popUpSection: string;
};

interface Event {
  id: string;
  eventName: string;
  selectedDate: string;
  selectedTime: string;
  addNote: string;
  selectedLabel: string;
}

const ScheduleCard = (props: Props) => {
  const { user } = useAuth();
  const popUpRef: RefObject<HTMLDivElement> = useRef(null);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const userDocRef = doc(collection(db, "authEvents"), user.uid);
        const schedulesCollectionRef = collection(userDocRef, "schedules");

        // Get all documents from the "schedules" collection
        const querySnapshot = await getDocs(schedulesCollectionRef);

        // Initialize an array to store the events
        const eventsArray: Event[] = [];

        // Loop through the documents and push the data to the array
        querySnapshot.forEach((doc) => {
          eventsArray.push({ id: doc.id, ...doc.data() } as Event);
        });

        // Set the events state with the fetched data
        setEvents(eventsArray);
        console.log("All events:", eventsArray);
      } catch (error) {
        console.error("Error getting events:", error);
      }
    };

    getAllEvents();
  }, []);

  let filteredSchedule = events;

  if (props.popUpSection === "today") {
    const currentDate = dayjs();
    filteredSchedule = events.filter((event) => {
      const eventDate = dayjs(event.selectedDate, "DD/MM/YYYY");
      return eventDate.isSame(currentDate, "day");
    });
  } else if (props.popUpSection === "week") {
    const currentDate = dayjs();
    const startOfWeek = currentDate.startOf("week");
    const endOfWeek = currentDate.endOf("week");

    filteredSchedule = events.filter((event) => {
      const eventDate = dayjs(event.selectedDate, "DD/MM/YYYY");
      return eventDate.isAfter(startOfWeek) && eventDate.isBefore(endOfWeek);
    });
  } else if (props.popUpSection === "month") {
    const currentDate = dayjs();
    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");

    filteredSchedule = events.filter((event) => {
      const eventDate = dayjs(event.selectedDate, "DD/MM/YYYY");
      return eventDate.isAfter(startOfMonth) && eventDate.isBefore(endOfMonth);
    });
  }

  const scrollToTop = () => {
    if (popUpRef.current) {
      popUpRef.current.scrollTop = 0;
    }
  };

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
      {filteredSchedule.map((event) => (
        <div
          key={event.id}
          id={`notification-${event.id}`}
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
                {event.eventName}
              </div>
              <div className="h-4/6 w-full text-sm">{event.addNote}</div>
              <div className="h-auto w-full flex items-center justify-between text-[0.7rem] font-semibold tracking-wide">
                <span>{event.selectedDate}</span>
                <span> {event.selectedTime}</span>
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
