"use client";

// react components
import React, { useEffect, useRef, RefObject } from "react";

// icons
import { GoKebabHorizontal } from "react-icons/go";
import { HiOutlineBell } from "react-icons/hi";

// assets
import { Notifications } from "./PopUpList";
import { Messages } from "./PopUpList";

type Props = {
  popUpSection: string;
  topBarSection: string;
};

const PopUpCard = (props: Props) => {
  let filteredNotifications;
  const popUpRef: RefObject<HTMLDivElement> = useRef(null);

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

  if (props.popUpSection === "All") {
    if (props.topBarSection === "Messages") {
      filteredNotifications = Messages;
    } else {
      filteredNotifications = Notifications;
    }
  } else {
    if (props.topBarSection === "Messages") {
      filteredNotifications = Messages.filter(
        (message) => message.type === props.popUpSection
      );
    } else {
      filteredNotifications = Notifications.filter(
        (notification) => notification.type === props.popUpSection
      );
    }
  }
  return (
    <div
      className="popUp h-full w-full p-4 flex flex-col gap-2 overflow-y-scroll"
      ref={popUpRef}
    >
      {filteredNotifications.map((notification) => (
        <div
          key={notification.id}
          id={`notification-${notification.id}`}
          className="h-auto w-full flex items-center justify-start bg-[#ededed] rounded-[0.5rem] cursor-pointer"
        >
          <div className="h-full w-2 bg-[#d8a462] rounded-l-[0.5rem]"></div>
          <div className="h-full w-11/12 flex items-center justify-between">
            <div className="h-full w-1/6 flex items-center justify-center text-3xl">
              <span className="rounded-full bg-[#b3b3b36c] p-1">
                <HiOutlineBell />
              </span>
            </div>
            <div className="h-full w-11/12 flex flex-col items-center justify-start gap-2 p-2">
              <div className="h-auto w-full font-semibold">
                Notification Title
              </div>
              <div className="h-4/6 w-full text-sm">{notification.message}</div>
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

export default PopUpCard;
