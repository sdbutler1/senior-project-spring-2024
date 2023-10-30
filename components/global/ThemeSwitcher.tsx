"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { Switch } from "@headlessui/react";

interface ThemeSwitcherProps {
  isSidebarOpen: boolean;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ isSidebarOpen }) => {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    // Check if the user's system prefers dark mode
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setEnabled(prefersDarkMode);

    // Retrieve the user's preference from localStorage, if available
    const userPreference = localStorage.getItem("themePreference");
    if (userPreference !== null) {
      setEnabled(userPreference === "dark");
      setTheme(userPreference);
    }
  }, [setTheme]);

  const handleSwitchChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setEnabled(newTheme === "dark");
    setTheme(newTheme);

    // Store the user's preference in localStorage
    localStorage.setItem("themePreference", newTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="h-full w-full flex items-center justify-between">
      <div
        className={`h-full w-4/12 flex items-center justify-center ml-1 ${
          isSidebarOpen ? "flex" : "hidden"
        }`}
      >
        {theme === "dark" ? (
          <RiMoonLine className="text-[1.3rem]" />
        ) : (
          <RiSunLine className="text-[1.3rem]" />
        )}
      </div>
      <div
        className={`h-full w-full flex items-center justify-start text-[1.1rem] ml-1.5 ${
          isSidebarOpen ? "flex" : "hidden"
        }`}
      >
        {theme === "dark" ? "Dark Mode" : "Light Mode"}
      </div>
      <div
        className={`h-full ${
          isSidebarOpen ? "w-4/12" : "w-full"
        } flex items-center justify-center`}
      >
        <Switch
          checked={enabled}
          onChange={handleSwitchChange}
          className={`${
            enabled ? "bg-[#373636]" : "bg-[#e7e5e5]"
          } relative inline-flex h-6 w-12 items-center rounded-full hover:scale-105`}
        >
          <span
            className={`${
              enabled ? "translate-x-7" : "translate-x-1"
            } flex items-center justify-center h-4 w-4 transform rounded-full transition bg-[#aeaeae] hover:text-[#8b2333]`}
          ></span>
        </Switch>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
