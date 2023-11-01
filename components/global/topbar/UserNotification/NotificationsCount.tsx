// react components
import React from "react";

// assets
import { Notifications } from "./Notifications";

type Props = {};

const NotificationsCount = (props: Props) => {
  return (
    <div className="absolute top-0 right-0 flex items-center justify-center h-4 w-4 text-xs text-white bg-[#7d1f2e] rounded-full animate-bounce">
      {Notifications.length}
    </div>
  );
};

export default NotificationsCount;
