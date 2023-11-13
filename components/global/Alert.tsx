import React from "react";

// Define the class mapping
const alertClasses = {
  success: "bg-[#2ea93c] text-[#fff]",
  error: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
};

interface AlertProps {
  message: string;
  type: String;
  translateAlert: boolean;
}

const Alert: React.FC<AlertProps> = ({ message, type, translateAlert }) => {
  const alertClass = alertClasses[type as "success" | "error" | "info"];

  return (
    <div
      className={`absolute top-8 h-16 w-auto flex items-center justify-center text-xl p-4 ${alertClass} font-mono rounded-md ${
        !translateAlert ? "translate-y-0" : "translate-y-[-200%]"
      } transition duration-500`}
    >
      {message}
    </div>
  );
};

export default Alert;
