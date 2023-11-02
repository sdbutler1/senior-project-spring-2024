// react components
import React from "react";

// assets
import { Notifications } from "./Notifications";

type Props = {};

const NotificationList = (props: Props) => {
  return (
    <div className="h-full w-full flex items-start justify-center ">
      <ul className="h-full w-full flex flex-col items-center justify-start">
        {Notifications.map((notification) => (
          <li
            key={notification.id}
            className="h-auto w-full flex items-center justify-start p-2 border"
          >
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
