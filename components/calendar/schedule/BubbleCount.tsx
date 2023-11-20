// react components
import React, { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import dayjs from "dayjs";

// components
import { useAuth } from "@/context/AuthContext";

// assets
import { db } from "@/config/firebase";

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

const BubbleCount = (props: Props) => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);

      } catch (error) {
        console.error("Error getting events:", error);
        setLoading(false);
      }
    };

    getAllEvents();
  }, [user.uid]);

  let filteredSchedule: Event[] = [];
  let ScheduleLength;

  if (props.popUpSection === "all") {
    filteredSchedule = events;
    ScheduleLength = events.length;
  } else if (props.popUpSection === "today") {
    const currentDate = dayjs();
    filteredSchedule = events.filter((event) => {
      const eventDate = dayjs(event.selectedDate, "DD/MM/YYYY");
      return eventDate.isSame(currentDate, "day");
    });
    ScheduleLength = filteredSchedule.length;
  } else if (props.popUpSection === "week") {
    const currentDate = dayjs();
    const startOfWeek = currentDate.startOf("week");
    const endOfWeek = currentDate.endOf("week");

    filteredSchedule = events.filter((event) => {
      const eventDate = dayjs(event.selectedDate, "DD/MM/YYYY");
      return eventDate.isAfter(startOfWeek) && eventDate.isBefore(endOfWeek);
    });
    ScheduleLength = filteredSchedule.length;
  } else if (props.popUpSection === "month") {
    const currentDate = dayjs();
    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");

    filteredSchedule = events.filter((event) => {
      const eventDate = dayjs(event.selectedDate, "DD/MM/YYYY");
      return eventDate.isAfter(startOfMonth) && eventDate.isBefore(endOfMonth);
    });
    ScheduleLength = filteredSchedule.length;
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
