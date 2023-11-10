"use client";

// react components
import { useEffect, useState } from "react";

// global states
import { useGlobalLoading } from "@/globalStates/useGlobalLoading";

// components
import { useAuth } from "@/context/AuthContext";

const TimeoutPopup: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { logout, user } = useAuth();
  const { setLoading, setLoading2 } = useGlobalLoading();

  // function to check for inactivity and log out
  const checkForInactivity = () => {
    // Gat Expire Time from Local Storage
    const expireTime = localStorage.getItem("expireTime");

    // If Time is greater than Expire Time by 2 minutes, log out
    if (showPopup) {
      updateExpireTime(120000);
      if (user && expireTime !== null && +expireTime < Date.now()) {
        handleLogout();
      }
    } else {
      // If Expire Time is earlier than now, show popup
      if (user && expireTime !== null && +expireTime < Date.now()) {
        setShowPopup(true);
      }
    }
  };

  // function to update expire time
  const updateExpireTime = (time: number) => {
    // set expire time to 15 minutes from now
    const expireTime = Date.now() + time;

    // set Expire TIme in local Storage
    localStorage.setItem("expireTime", expireTime.toString());
  };

  // Use Effect to set interval to check inactivity
  useEffect(() => {
    // check for inactivity every 1 seconds if user is logged in
    if (user) {
      const interval = setInterval(() => {
        checkForInactivity();
      }, 1000);

      // clear interval on unmount
      return () => clearInterval(interval);
    }
  }, [user]);

  // Use Expire Time on any user activity
  useEffect(() => {
    // Set Initial Expire Time if user is logged in
    if (user && !showPopup) {
      updateExpireTime(120000);

      // set event listeners
      window.addEventListener("click", () => updateExpireTime(120000));
      window.addEventListener("keypress", () => updateExpireTime(120000));
      window.addEventListener("scroll", () => updateExpireTime(120000));
      window.addEventListener("mousemove", () => updateExpireTime(120000));

      // clean up
      return () => {
        window.removeEventListener("click", () => updateExpireTime(120000));
        window.removeEventListener("keypress", () => updateExpireTime(120000));
        window.removeEventListener("scroll", () => updateExpireTime(120000));
        window.removeEventListener("mousemove", () => updateExpireTime(120000));
      };
    }
  }, [user]);

  const handleContinueWorking = () => {
    // remove popup
    setShowPopup(false);
    setLoading(true, 0, 1500);
    updateExpireTime(120000);
  };

  const handleLogout = () => {
    // remove popup
    setShowPopup(false);
    setLoading2(true, 0, 1500);
    logout();
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen inset-0 ${
        showPopup ? "flex" : "hidden"
      } items-center justify-center bg-gray-900 bg-opacity-50`}
    >
      {showPopup && (
        <div className="timePopup h-48 w-96 flex flex-col items-center justify-center gap-8 bg-[#fff] p-6 rounded-lg shadow-md">
          <p className="text-lg text-black font-medium">
            Are you still there? We&apos;ll log you out unless you confirm
            you&apos;re still working on this page.
          </p>
          <div className="flex space-x-4">
            <button
              className="bg-[#d8a462] text-black px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleContinueWorking}
            >
              Continue Working
            </button>
            <button
              className="bg-[#7d1f2e] text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeoutPopup;
