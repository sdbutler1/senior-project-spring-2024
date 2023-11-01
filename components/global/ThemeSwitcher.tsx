"use client";

// react components
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@headlessui/react";

// Icons
import { RiMoonLine, RiSunLine } from "react-icons/ri";

// global states
import { globalSideBar } from "@/globalStates/globalSideBar";

interface ThemeSwitcherProps {}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = () => {
  const { isSidebarOpen, isSidebarHidden } = globalSideBar();
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
    <div className="relative h-full w-full flex items-center justify-center">
      <div
        className={`absolute left-0 h-full w-full flex items-center justify-start pl-4 ${
          isSidebarOpen ? "opacity-100 delay-200" : "opacity-0"
        }`}
      >
        {theme === "dark" ? (
          <RiMoonLine className="text-[1.3rem]" />
        ) : (
          <RiSunLine className="text-[1.3rem]" />
        )}
      </div>
      <div
        className={`absolute h-full w-full flex items-center justify-start text-[1.1rem] whitespace-nowrap pl-12 ${
          isSidebarOpen ? "opacity-100 delay-200" : "opacity-0"
        }`}
      >
        {theme === "dark" ? "Dark Mode" : "Light Mode"}
      </div>
      <div
        className={`absolute right-0 h-full w-full flex items-center ${
          isSidebarOpen
            ? "justify-end pr-4"
            : !isSidebarOpen && !isSidebarHidden
            ? "hidden justify-end pr-4"
            : "justify-center pr-0"
        }`}
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
