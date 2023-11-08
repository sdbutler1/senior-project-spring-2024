"use client";

// react components
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// global states
import globalUserPhoto from "@/globalStates/globalUserPhoto";

// components
import CurrentUser from "@/components/global/CurrentUser";
import { useAuth } from "@/context/AuthContext";

// assets

// icons
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete, AiOutlineClose, AiTwotoneCamera } from "react-icons/ai";
import { BiSolidUserCircle } from "react-icons/bi";

type Props = {};

const Page = (props: Props) => {
  const [isEditPopUp, setEditPopUp] = useState(false);
  const [isDeletePopUp, setDeletePopUp] = useState(false);
  const currentUser = CurrentUser({});
  const { user } = useAuth();
  const [istranslateSuccessAlert, settranslateSuccessAlert] = useState(false);
  const [istranslateErrorAlert, settranslateErrorAlert] = useState(false);
  const {
    setCurrentPhoto,
    setNoPhoto,
  } = globalUserPhoto();

  var randomstring = require("randomstring");

  const translateSuccessAlert = () => {
    settranslateSuccessAlert(!istranslateSuccessAlert);
  };

  const translateErrorAlert = () => {
    settranslateErrorAlert(!istranslateErrorAlert);
  };

      // translateErrorAlert();
      // setTimeout(() => {
      //   translateErrorAlert();
      // }, 3000);

  useEffect(() => {
    const closePopupsOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isDeletePopUp === true) {
        if (!target.closest(".deletePopUp")) {
          setDeletePopUp(false);
        }
      } else {
        if (!target.closest(".editPopUp") && !target.closest(".deletePopUp")) {
          setEditPopUp(false);
        }
      }
    };
    document.addEventListener("click", closePopupsOnOutsideClick);
    return () => {
      document.removeEventListener("click", closePopupsOnOutsideClick);
    };
  }, [isEditPopUp, setEditPopUp, isDeletePopUp, setDeletePopUp]);

  return (
    <div className="relative h-full w-full flex flex-col items-start justify-start">
      <div
        className={`absolute top-3 left-[39%] h-[3.25rem] w-80 flex items-center justify-center text-lg font-semibold bg-[#76ec93e7] z-50 ${
          istranslateSuccessAlert ? "translate-y-0" : "translate-y-[-450%]"
        } transition duration-700 delay-700`}
      >
        Image Uploaded
      </div>
      <div
        className={`absolute top-3 left-[39%] h-[3.25rem] w-80 flex items-center justify-center text-lg font-semibold bg-[#eb5351] z-50 ${
          istranslateSuccessAlert ? "translate-y-0" : "translate-y-[-450%]"
        } transition duration-700 delay-700`}
      >
        Error: Image unable to be uploaded
      </div>
      <div className="h-auto w-full flex flex-col items-center justify-center gap-4 -mb-4">
        <div className="h-auto w-full flex items-center justify-between text-xl font-semibold bg-[#fff] px-4 py-3 rounded-lg">
          <h1>Edit Profile</h1>
          {currentUser ? (
            <div className="flex items-center justify-center">
              <Image
                src={currentUser.currentPhoto}
                width={50}
                height={50}
                alt={`${currentUser.firstName} ${currentUser.lastName}`}
                className="rounded-full"
              />
            </div>
          ) : (
            <p>User not found</p>
          )}
        </div>
        <div className="h-auto w-full flex items-center justify-center">
          <div className="relative h-full w-full flex items-start justify-center">
            <div className="relative h-auto w-auto flex items-start">
              {currentUser ? (
                <Image
                  src={currentUser.currentPhoto}
                  width={120}
                  height={120}
                  alt={`${currentUser.firstName} ${currentUser.lastName}`}
                  className="rounded-full"
                />
              ) : (
            <p>User not found</p>
          )}
              <button
                onClick={() => setEditPopUp(true)}
                className="editPopUp absolute bottom-2 right-2 h-6 w-6 flex items-center justify-center text-[#fff] bg-[#7d1f2e] rounded-full"
              >
                <MdModeEdit />
              </button>
            </div>
          </div>
          <ul className="h-auto w-48 flex flex-col items-start justify-center gap-2 text-lg font-semibold bg-[#fff] p-6">
            <Link href="">
              <li className="hover:text-[#000]">About Us </li>
            </Link>
            <Link href="">
              <li className="hover:text-[#000]">Help </li>
            </Link>
            <Link href="">
              <li className="hover:text-[#000]">FAQ</li>
            </Link>
            <Link href="https://www.shawu.edu/Privacy_and_Usage_Policy2.aspx">
              <li className="hover:text-[#000]">Privacy Policy</li>
            </Link>
          </ul>
        </div>
      </div>
      <div
        className={`editPopUp absolute top-[11.3rem] left-[28.5%] h-[24.8rem] w-[41.4rem] ${
          isEditPopUp ? "flex" : "hidden"
        } flex-col items-center justify-center bg-[#fff] rounded-lg border`}
      >
        <div className="h-1/6 w-full flex items-center justify-between p-8">
          <h1 className="text-lg font-semibold">Profile photo</h1>
          <AiOutlineClose
            className="text-xl cursor-pointer"
            onClick={() => setEditPopUp(false)}
          />
        </div>
        {currentUser ? (
          <div className="h-4/6 w-full flex items-center justify-center">
            <Image
              src={currentUser.currentPhoto}
              width={100}
              height={100}
              alt={`${currentUser.firstName} ${currentUser.lastName}`}
              className="h-48 w-48 rounded-full"
            />
          </div>
        ) : (
          <p>User not found</p>
        )}
        <div className="h-1/6 w-full flex items-center justify-between text-sm font-semibold p-8 border">
          <div className="flex items-center justify-center gap-10">
            <button
              // onClick={openFileInput}
              className="flex flex-col items-center justify-center"
            >
              <AiTwotoneCamera className="text-2xl" />
              Add Photo
            </button>
            <button
              onClick={setCurrentPhoto}
              className="flex flex-col items-center justify-center"
            >
              <BiSolidUserCircle className="text-2xl" />
              Default Photo
            </button>
            <input
              type="file"
              accept="image/*"
              // ref={fileInputRef}
              style={{ display: "none" }}
              // onChange={handleFileInputChange}
            />
          </div>
          <button
            onClick={() => setDeletePopUp(true)}
            className="deletePopUp flex flex-col items-center justify-center"
          >
            <AiFillDelete className="text-2xl" />
            Delete
          </button>
        </div>
      </div>
      <div
        className={`deletePopUp absolute top-[18rem] left-[40%] h-48 w-80 ${
          isDeletePopUp ? "flex" : "hidden"
        } flex-col items-center justify-center bg-[#7d1f2e] text-[#fff] rounded-lg border`}
      >
        <div className="h-2/6 w-full flex items-center justify-between p-4">
          <h2 className="h-full w-auto flex items-center justify-end font-semibold">
            Delete profile photo
          </h2>
          <AiOutlineClose
            className="text-xl cursor-pointer"
            onClick={() => setDeletePopUp(false)}
          />
        </div>
        <p className="h-3/6 w-full flex items-start justify-start p-4">
          Are you sure? Having a profile picture helps others recognize you.
        </p>
        <div className="h-1/6 w-full flex items-center justify-end gap-6 p-4">
          <button
            onClick={() => setDeletePopUp(false)}
            className="flex items-center justify-center"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setDeletePopUp(false), setNoPhoto();
            }}
            className="flex items-center justify-center"
          >
            Delete
          </button>
        </div>
      </div>
      <form className="h-full w-3/6 flex flex-col items-center justify-start text-[15px] font-semibold">
        <div className="h-auto w-full flex items-center justify-center gap-10 p-2">
          <label
            htmlFor="title"
            className="h-auto w-full flex flex-col items-start justify-center"
          >
            Title
            <input
              id="title"
              name="title"
              autoComplete="on"
              className="h-12 w-full flex flex-col items-center justify-center border rounded-md"
            />
          </label>
          <label
            htmlFor="fullName"
            className="h-auto w-full flex flex-col items-start justify-center"
          >
            Full Name
            <input
              id="fullName"
              name="fullName"
              autoComplete="on"
              className="h-12 w-full flex flex-col items-center justify-center border rounded-md"
            />
          </label>
        </div>
        <label
          htmlFor="email"
          className="h-auto w-full flex flex-col items-start justify-center p-2"
        >
          Email
          <input
            id="email"
            name="email"
            autoComplete="on"
            className="h-12 w-full flex flex-col items-center justify-center border rounded-md"
          />
        </label>
        <label
          htmlFor="number"
          className="h-auto w-full flex flex-col items-start justify-center p-2"
        >
          Number
          <input
            id="number"
            name="number"
            autoComplete="on"
            className="h-12 w-full flex flex-col items-center justify-center border rounded-md"
          />
        </label>
        <label
          htmlFor="city"
          className="h-auto w-full flex flex-col items-start justify-center p-2"
        >
          City
          <input
            id="city"
            name="city"
            autoComplete="on"
            className="h-12 w-full flex flex-col items-center justify-center border rounded-md"
          />
        </label>
        <div className="h-auto w-full flex items-center justify-center gap-10 p-2">
          <label
            htmlFor="state"
            className="h-auto w-full flex flex-col items-start justify-center"
          >
            State
            <input
              id="state"
              name="state"
              autoComplete="on"
              className="h-12 w-full flex flex-col items-center justify-center border rounded-md"
            />
          </label>
          <label
            htmlFor="zipCode"
            className="h-auto w-full flex flex-col items-start justify-center"
          >
            Zip Code
            <input
              id="zipCode"
              name="zipCode"
              autoComplete="on"
              className="h-12 w-full flex flex-col items-center justify-center border rounded-md"
            />
          </label>
        </div>
        <label
          htmlFor="country"
          className="h-auto w-full flex flex-col items-start justify-center p-2"
        >
          Country
          <input
            id="country"
            name="country"
            autoComplete="on"
            className="h-12 w-full flex flex-col items-center justify-center border rounded-md"
          />
        </label>
      </form>
      <div className="h-auto w-3/6 flex items-center justify-end gap-8 p-2">
        <button
          type="button"
          className="h-10 w-36 flex items-center justify-center font-semibold rounded hover:bg-[#fff]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="h-10 w-36 flex items-center justify-center text-[#fff] font-semibold bg-[#7d1f2e] rounded hover:bg-[#701b29]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Page;
