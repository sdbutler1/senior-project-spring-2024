"use client";

// react components
import { useEffect, useState } from "react";

// global states
import { useGlobalLoading } from "@/globalStates/useGlobalLoading";
import { useGlobalTimeOutPopUp } from "@/globalStates/useGlobalTimeOutPopUp";

// components
import { useAuth } from "@/context/AuthContext";

const TimeoutPopup: React.FC = () => {
  const { showPopup, setShowPopup } = useGlobalTimeOutPopUp();
  const { logout, user } = useAuth();
  const { setLoading, setLoading2 } = useGlobalLoading();

  // function to check for inactivity and log out
  const checkForInactivity = () => {
    // Gat Expire Time from Local Storage
    const expireTime = localStorage.getItem("expireTime");

    // If Expire Time is earlier than now, log out
    if (user && expireTime !== null && +expireTime < Date.now()) {
      setShowPopup(true);
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
    // Set Initial Expire Time if the user is logged in
    if (user && !showPopup) {
      updateExpireTime(900000);

      // set event listeners
      const activityListener = () => updateExpireTime(900000);

      window.addEventListener("click", activityListener);
      window.addEventListener("keypress", activityListener);
      window.addEventListener("scroll", activityListener);
      window.addEventListener("mousemove", activityListener);

      // clean up
      return () => {
        window.removeEventListener("click", activityListener);
        window.removeEventListener("keypress", activityListener);
        window.removeEventListener("scroll", activityListener);
        window.removeEventListener("mousemove", activityListener);
      };
    } else if (user && showPopup) {
      // clear interval if 2 minutes pass
      const timeoutInterval = setTimeout(() => {
        setShowPopup(false);
        setLoading2(true, 0, 1500);
        logout();
      }, 120000); // 2 minutes

      // clean up
      return () => {
        clearTimeout(timeoutInterval);
      };
    }
  }, [user, showPopup, logout, setLoading2, setShowPopup]);

  const handleContinueWorking = () => {
    // remove popup
    setShowPopup(false);
    setLoading(true, 0, 1500);
    updateExpireTime(900000);
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
