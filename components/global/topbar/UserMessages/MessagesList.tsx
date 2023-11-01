// react components
import React from "react";

// assets
import { Messages } from "./Messages";

type Props = {};

const NotificationList = (props: Props) => {
  return (
    <div className="h-full w-full flex items-start justify-center ">
      <ul className="h-full w-full flex flex-col items-center justify-start">
        {Messages.map((Messages) => (
          <li
            className="h-auto w-full flex items-center justify-start p-2 border"
          >
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
