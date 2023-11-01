"use client";

// react components

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

// assets
import loader from "@/public/assets/spinner.svg";

const usePathnameChanges = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return loading;
};

export const Loading: React.FC = () => {
  const loading = usePathnameChanges();

  if (loading) {
    return (
      <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-[#7d1f2e] z-[1000]">
        <Image src={loader} alt="loading..." priority/>
      </div>
    );
  } else {
    return null;
  }
};
