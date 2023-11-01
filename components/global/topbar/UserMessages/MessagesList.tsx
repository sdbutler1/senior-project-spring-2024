// react components
import React from "react";

// assets
import { Notifications } from "./Messages";

type Props = {};

const NotificationList = (props: Props) => {
  return (
    <div className="flex items-center justify-center border border-orange-500">
      <ul className="flex items-center justify-center">
        {Notifications.map((notification) => (
          <li key={notification.id} className="flex items-center justify-center border">{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
