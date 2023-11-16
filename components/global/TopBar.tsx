import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// global states
import { useGlobalSideBar } from "@/globalStates/useGlobalSideBar";
import { useglobalPopUp } from "@/globalStates/useglobalPopUp";
import { useGlobalLoading } from "@/globalStates/useGlobalLoading";

//components
import CurrentUser from "@/components/global/CurrentUser";
import { useAuth } from "@/context/AuthContext";

// assets
import logo from "@/public/assets/shaw.png";

// icons
import { HiMenu } from "react-icons/hi";
import { GoTriangleDown } from "react-icons/go";

const Topbar = () => {
  const { loading, setLoading, loading2 } = useGlobalLoading();
  const currentUser = CurrentUser({});
  const { user } = useAuth();
  const { isSidebarOpen, isSidebarHidden, toggleSideBar, HideSideBar } =
    useGlobalSideBar();
  const { isPopUpOpen1, setPopUpOpen1, setPopUpOpen2 } = useglobalPopUp();
  const userPhotoUrl =
    "https://firebasestorage.googleapis.com/v0/b/com-sci-dep-auth-project.appspot.com/o/default.png?alt=media&token=bafe0340-24ec-4083-ba7d-5bd6e3319d02";
  const togglePopUp = (popupNumber: number) => {
    setPopUpOpen1(popupNumber === 1);
  };

  useEffect(() => {
    const closePopupsOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".topbarPopup") && !target.closest(".popup")) {
        setPopUpOpen1(false);
        setPopUpOpen2(false);
      }
      if (target.closest(".popUpClick")) {
        setPopUpOpen1(false);
      }
    };
    document.addEventListener("click", closePopupsOnOutsideClick);
    return () => {
      document.removeEventListener("click", closePopupsOnOutsideClick);
    };
  }, [isPopUpOpen1, setPopUpOpen1, setPopUpOpen2]);

  useEffect(() => {
    setLoading(true, 0, 1000);
  }, [setLoading, loading2]);

  return (
    <div className="fixed top-0 left-0 h-20 w-full flex items-center justify-between bg-[#fefefe] border-b border-slate-100 z-50">
      <Link
        href={"/"}
        className="h-full w-64 flex items-center sm:justify-center px-2 cursor-pointer"
      >
        <Image
          src={logo}
          alt="logo"
          className="h-4/5 md:h-5/6 w-6/12 md:w-11/12 object-contain"
          priority
        />
      </Link>
      <div className="h-full w-80 flex items-center justify-end gap-4 pr-4 lg:pr-8">
        <button
          type="button"
          onClick={() => togglePopUp(1)}
          className="relative flex items-center justify-center"
        >
          {currentUser && user && (
            <div
              className={`${
                loading ? "opacity-0" : "opacity-100"
              }  flex items-center justify-center gap-2 transition-opacity`}
            >
              <Image
                src={user.photoURL ? user.photoURL : userPhotoUrl}
                width={50}
                height={50}
                alt={`${currentUser.firstName} ${currentUser.lastName}`}
                className="h-8 w-8 rounded-full"
              />
              <div className="flex items-center justify-center gap-1">
                <p className="font-semibold">
                  {currentUser.title} {currentUser.firstName} &nbsp;
                  {currentUser.lastName}
                </p>
                <GoTriangleDown className="text-2xl text-[#7d1f2e] flex" />
              </div>
            </div>
          )}
        </button>
        <div
          className={`cursor-pointer ${isSidebarHidden ? "hidden" : "flex"}`}
          onClick={() =>
            !isSidebarOpen && isSidebarHidden
              ? toggleSideBar()
              : !isSidebarOpen &&
                !isSidebarHidden &&
                (toggleSideBar(), HideSideBar())
          }
        >
          <li className="h-full w-full flex items-center justify-center">
            <HiMenu className="text-[1.5rem] lg:text-[2rem] text-[#7d1f2e]" />
          </li>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
