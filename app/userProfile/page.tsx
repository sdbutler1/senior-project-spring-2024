"use client";

// react components
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { updateProfile, User } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";

// global states
import { useglobalPopUp } from "@/globalStates/useglobalPopUp";
import { useGlobalLoading } from "@/globalStates/useGlobalLoading";

// components
import CurrentUser from "@/components/global/CurrentUser";
import { useAuth } from "@/context/AuthContext";

// assets
var randomstring = require("randomstring");

// icons
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete, AiOutlineClose, AiTwotoneCamera } from "react-icons/ai";
import { BiSolidUserCircle } from "react-icons/bi";

type Props = {};

const Page = (props: Props) => {
  const { loading, setLoading } = useGlobalLoading();
  const currentUser = CurrentUser({});
  const { user } = useAuth();
  const router = useRouter();
  const storage = getStorage();
  const [EditPopUp, setEditPopUp] = useState(false);
  const [DeletePopUp, setDeletePopUp] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const photoInputRef = React.createRef<HTMLInputElement>();
  const userPhotoUrl =
    "https://firebasestorage.googleapis.com/v0/b/com-sci-dep-auth-project.appspot.com/o/default.png?alt=media&token=bafe0340-24ec-4083-ba7d-5bd6e3319d02";

  const [translateAlert, setTranslateAlert] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const showTranslateAlert = (
    isOpen: boolean,
    message: string,
    type: string
  ) => {
    setTranslateAlert({
      isOpen,
      message,
      type,
    });

    if (isOpen) {
      setTimeout(() => {
        setTranslateAlert({ isOpen: false, message: message, type: type });
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
    setEditPopUp(false);
  };

  const handleClick = () => {
    if (photoInputRef.current) {
      photoInputRef.current.click();
    }
  };

  const uploadNewPhoto = useCallback(
    async (
      file: File,
      currentUser: User,
      setLoading: (value: boolean, delay: number, wait: number) => void
    ) => {
      const fileRef = ref(
        storage,
        "emailImages/" + randomstring.generate() + ".png"
      );
      try {
        const snapshot = await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);
        setTimeout(() => {
          updateProfile(currentUser, { photoURL });
          setLoading(true, 3000, 2000);
        }, 1000);
        showTranslateAlert(true, "New photo added successfully", "success");
      } catch (error) {
        showTranslateAlert(true, "Error uploading photo", "error");
      }
    },
    [storage]
  );

  useEffect(() => {
    if (photo) {
      uploadNewPhoto(photo, user, setLoading);
    }
  }, [photo, uploadNewPhoto, user]);

  const handleSetEmailPhoto = async () => {
    try {
      if (currentUser) {
        const photoURL = currentUser.emailPhoto;
        setTimeout(() => {
          updateProfile(user, { photoURL });
        }, 1000);
        setLoading(true, 3000, 2000);
        showTranslateAlert(true, "Default photo set successfully", "success");
      }
    } catch (error) {
      console.error("Error setting default photo:", error);
      showTranslateAlert(
        true,
        `Error setting default photo: ${error}`,
        "error"
      );
    }
    setEditPopUp(false);
  };

  const handleDeletePhoto = async () => {
    try {
      setTimeout(() => {
        const photoURL = "";
        updateProfile(user, { photoURL });
      }, 1000);
      setLoading(true, 3000, 2000);
      showTranslateAlert(true, "Photo deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting user photo:", error);
      showTranslateAlert(true, `Error deleting user photo: ${error}`, "error");
    }
  };

  useEffect(() => {
    const closePopupsOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (DeletePopUp === true) {
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
  }, [EditPopUp, setEditPopUp, DeletePopUp, setDeletePopUp]);

  useEffect(() => {
    setLoading(true, 0, 1000);
  }, [setLoading]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  return (
    <div className="relative h-full w-full flex flex-col items-start justify-start">
      <div
        className={`absolute top-3 left-[39%] h-[3.25rem] w-80 flex items-center justify-center text-lg font-semibold ${
          translateAlert.type === "success"
            ? "bg-[#76ec93e7] text-black"
            : "bg-[#d93966] text-white"
        } z-50 ${
          translateAlert.isOpen ? "translate-y-0" : "translate-y-[-450%]"
        } transition duration-1000 delay-100`}
      >
        {translateAlert.message}
      </div>
      <div className="h-auto w-full flex flex-col items-center justify-center gap-4 -mb-4">
        <div className="h-auto w-full flex items-center justify-between text-xl font-semibold bg-[#fff] px-4 py-3 rounded-lg">
          <h1>Update Profile</h1>
          {currentUser && user ? (
            <div className="flex items-center justify-center">
              <Image
                src={user.photoURL ? user.photoURL : userPhotoUrl}
                width={50}
                height={50}
                alt={`${currentUser.firstName} ${currentUser.lastName}`}
                priority
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
              {currentUser && user ? (
                <Image
                  src={user.photoURL ? user.photoURL : userPhotoUrl}
                  width={120}
                  height={120}
                  alt={`${currentUser.firstName} ${currentUser.lastName}`}
                  priority
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
            <li className="hover:text-[#000] cursor-pointer">
              <Link href="https://www.shawcomputerscience.com/" target="_blank">
                About Us
              </Link>
            </li>
            <li className="hover:text-[#000] cursor-pointer">
              <button>Help</button>
            </li>
            <li className="hover:text-[#000] cursor-pointer">
              <Link href="" target="_blank">
                FAQ
              </Link>
            </li>
            <li className="hover:text-[#000] cursor-pointer">
              <Link
                href="https://www.shawu.edu/Privacy_and_Usage_Policy2.aspx"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`editPopUp absolute top-[11.3rem] left-[28.5%] h-[24.8rem] w-[41.4rem] ${
          EditPopUp ? "flex" : "hidden"
        } flex-col items-center justify-center bg-[#fff] rounded-lg border`}
      >
        <div className="h-1/6 w-full flex items-center justify-between p-8">
          <h1 className="text-lg font-semibold">Profile photo</h1>
          <AiOutlineClose
            className="text-xl cursor-pointer"
            onClick={() => setEditPopUp(false)}
          />
        </div>
        {currentUser && user ? (
          <div className="h-4/6 w-full flex items-center justify-center">
            <Image
              src={user.photoURL ? user.photoURL : userPhotoUrl}
              width={100}
              height={100}
              alt={`${currentUser.firstName} ${currentUser.lastName}`}
              priority
              className="h-48 w-48 rounded-full"
            />
          </div>
        ) : (
          <p>User not found</p>
        )}
        <div className="h-1/6 w-full flex items-center justify-between text-sm font-semibold p-8 border">
          <div className="flex items-center justify-center gap-10">
            <button
              onClick={handleClick}
              disabled={loading}
              className="flex flex-col items-center justify-center"
            >
              <AiTwotoneCamera className="text-2xl" />
              Add Photo
            </button>
            <button
              onClick={handleSetEmailPhoto}
              className="flex flex-col items-center justify-center"
            >
              <BiSolidUserCircle className="text-2xl" />
              Default Photo
            </button>
            <label htmlFor="fileInput">
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                id="fileInput"
                style={{ display: "none" }}
              />
            </label>
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
          DeletePopUp ? "flex" : "hidden"
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
              setDeletePopUp(false), handleDeletePhoto();
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
              className="h-12 w-full flex flex-col items-center justify-center text-black p-4 border rounded-md"
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
              className="h-12 w-full flex flex-col items-center justify-center text-black p-4 border rounded-md"
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
            className="h-12 w-full flex flex-col items-center justify-center text-black p-4 border rounded-md"
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
            className="h-12 w-full flex flex-col items-center justify-center text-black p-4 border rounded-md"
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
            className="h-12 w-full flex flex-col items-center justify-center text-black p-4 border rounded-md"
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
              className="h-12 w-full flex flex-col items-center justify-center text-black p-4 border rounded-md"
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
              className="h-12 w-full flex flex-col items-center justify-center text-black p-4 border rounded-md"
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
            value="United States"
            autoComplete="off"
            readOnly
            className="h-12 w-full flex flex-col items-center justify-center text-black p-4 border rounded-md focus-within:outline-none"
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
