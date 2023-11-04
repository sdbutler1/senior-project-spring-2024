// react components
import React from "react";

// assets
import { Notifications } from "./PopUpList";
import { Messages } from "./PopUpList";

type Props = {
  popUpSection: string;
  topBarSection: string;
};

const BubbleCount = (props: Props) => {
  let NotificationLength;
  let filteredNotifications;

  if (props.popUpSection === "All") {
    if (props.topBarSection === "Messages") {
      NotificationLength = Messages.length;
    } else {
      NotificationLength = Notifications.length;
    }
  } else {
    if (props.topBarSection === "Messages") {
      filteredNotifications = Messages.filter(
        (message) => message.type === props.popUpSection
      );
      NotificationLength = filteredNotifications.length;
    } else {
      filteredNotifications = Notifications.filter(
        (notification) => notification.type === props.popUpSection
      );
      NotificationLength = filteredNotifications.length;
    }
  }

  return (
    <div
      className={`absolute bottom-4 ${
        props.popUpSection === "All"
          ? "left-[1.1rem]"
          : props.popUpSection === "Unread"
          ? "left-[3.2rem]"
          : props.popUpSection === "Messages" || props.popUpSection === "Notifications"
          ? "top-0 right-0"
          : "left-[2.3rem]"
      } flex items-center justify-center h-4 w-4 text-xs text-white bg-[#7d1f2e] rounded-full`}
    >
      {NotificationLength}
    </div>
  );
};

export default BubbleCount;
