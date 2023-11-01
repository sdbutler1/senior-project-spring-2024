// react components
import React from "react";

// assets
import { Messages } from "../UserMessages/Messages";

type Props = {};

const MessagesCount = (props: Props) => {
  return (
    <div className="absolute top-0 right-0 flex items-center justify-center h-4 w-4 text-xs text-white bg-[#7d1f2e] rounded-full">
      {Messages.length}
    </div>
  );
};

export default MessagesCount;
