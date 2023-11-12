"use client";

// react components
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/config/firebase";
import { collection, doc, addDoc } from "firebase/firestore";

// global states
import { useglobalPopUp } from "@/globalStates/useglobalPopUp";
import { useGlobalLoading } from "@/globalStates/useGlobalLoading";

// icons
import { AiOutlineClose } from "react-icons/ai";

type Props = {};

const Help = (props: Props) => {
  const { user } = useAuth();
  const currentPathname = usePathname();
  const { setLoading } = useGlobalLoading();
  const { isPopUpOpen2, setPopUpOpen2 } = useglobalPopUp();

  if (currentPathname === "/login" || currentPathname === "/forgotPassword") {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Get form data
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    // Create an object from form data
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value as string;
    });

    try {
      // Reference to the user's document
      const userDocRef = doc(collection(db, "helpNotifications"), user.uid);

      // Reference to the subcollection within the user's document
      const subcollectionName = data.subject || "defaultSubcollectionName";
      const subcollectionRef = collection(userDocRef, subcollectionName);

      // Add a new document to the subcollection
      const newDocRef = await addDoc(subcollectionRef, data);

      console.log("Document added with ID: ", newDocRef.id);
      setPopUpOpen2(false);
      setLoading(true, 0, 2000);

      // clear the form after submission
      form.reset();
    } catch (e) {
      setPopUpOpen2(false);
      setLoading(true, 0, 2000);
      console.error("Error adding document to subcollection: ", e);
    }
  };

  return (
    <div
      className={`topbarPopup absolute top-60 left-[40%] h-[40rem] w-[40rem] flex-col items-center justify-start gap-2 text-black bg-[#fefefe] border rounded-2xl mr-8 ${
        isPopUpOpen2 ? "flex" : "hidden"
      }`}
    >
      <div className="h-[2.5rem] w-full flex items-center justify-between p-6">
        <h1 className="text-xl font-bold tracking-wider">Help</h1>
        <div className="flex items-center justify-center gap-4">
          <AiOutlineClose
            className="cursor-pointer"
            onClick={() => setPopUpOpen2(false)}
          />
        </div>
      </div>
      <form
        id="help"
        onSubmit={handleSubmit}
        className="h-full w-11/12 flex flex-col items-center justify-start gap-4 text-[14px] font-semibold"
      >
        <div className="h-auto w-full flex items-center justify-center gap-10">
          <label
            htmlFor="title"
            className="h-auto w-full flex flex-col items-start justify-center"
          >
            Title
            <input
              id="title"
              name="title"
              autoComplete="on"
              className="h-12 w-full flex flex-col items-center justify-center pl-4 border rounded-md"
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
              className="h-12 w-full flex flex-col items-center justify-center pl-4 border rounded-md"
            />
          </label>
        </div>
        <div className="h-auto w-full flex items-center justify-center gap-10">
          <label
            htmlFor="email"
            className="h-auto w-full flex flex-col items-start justify-center"
          >
            Email
            <input
              id="email"
              name="email"
              autoComplete="on"
              className="h-12 w-full flex flex-col items-center justify-center pl-4 border rounded-md"
            />
          </label>
          <label
            htmlFor="phoneNum"
            className="h-auto w-full flex flex-col items-start justify-center"
          >
            Phone Number
            <input
              id="phoneNumber"
              name="phoneNumber"
              autoComplete="on"
              className="h-12 w-full flex flex-col items-center justify-center pl-4 border rounded-md"
            />
          </label>
        </div>
        <label
          htmlFor="phoneNum"
          className="h-auto w-full flex flex-col items-start justify-center"
        >
          Subject
          <input
            id="subject"
            name="subject"
            autoComplete="off"
            className="h-12 w-full flex flex-col items-center justify-center pl-4 border rounded-md"
          />
        </label>
        <label
          htmlFor="message"
          className="h-4/6 w-full flex flex-col items-start justify-center"
        >
          Message
          <input
            id="message"
            name="message"
            autoComplete="off"
            className="h-full w-full flex flex-col items-center justify-center border rounded-md p-4"
          />
        </label>
        <button
          type="submit"
          className="h-12 w-36 flex items-center justify-center text-[#fff] font-semibold bg-[#7d1f2e] rounded hover:bg-[#701b29] mb-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Help;
