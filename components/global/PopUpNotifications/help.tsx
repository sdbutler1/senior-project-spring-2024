"use client";

// react components
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/config/firebase";
import { collection, doc, addDoc } from "firebase/firestore";

// global states
import { useglobalPopUp } from "@/globalStates/useglobalPopUp";
import { useGlobalLoading } from "@/globalStates/useGlobalLoading";
import { useGlobalAlert } from "@/globalStates/useGlobalAlert";

// icons
import { AiOutlineClose } from "react-icons/ai";
import CurrentUser from "@/components/global/CurrentUser";

type Props = {};

const Help = (props: Props) => {
  const { user } = useAuth();
  const currentPathname = usePathname();
  const { setLoading } = useGlobalLoading();
  const { isPopUpOpen2, setPopUpOpen2 } = useglobalPopUp();
  const { setTranslateAlert } = useGlobalAlert();
  const currentUser = CurrentUser({});
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  if (currentPathname === "/login" || currentPathname === "/forgotPassword") {
    return null;
  }

  useEffect(() => {
    if (!isPopUpOpen2) {
      setFormData({
        subject: "",
        message: "",
      });
    }
  }, [isPopUpOpen2, setFormData]);

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

      setPopUpOpen2(false);
      setTranslateAlert(
        true,
        "Message sent. Someone will be in contact soon",
        "success"
      );

      setTimeout(() => {
        setLoading(true, 0, 1000);
      }, 3000);

      // clear the form after submission
      form.reset();
    } catch (e) {
      setPopUpOpen2(false);
      setTranslateAlert(true, "Unable to send message. Try again", "error");
      setTimeout(() => {
        setLoading(true, 0, 1000);
      }, 3000);
    }

    setFormData({
      subject: "",
      message: "",
    });
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
              value={currentUser && user && currentUser.title}
              readOnly
              className="h-12 w-full flex flex-col items-center justify-center text-[#858585] pl-4 border rounded-md focus-within:outline-none"
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
              value={
                currentUser &&
                user &&
                `${currentUser.firstName} ${currentUser.lastName}`
              }
              readOnly
              className="h-12 w-full flex flex-col items-center justify-center text-[#858585] pl-4 border rounded-md focus-within:outline-none"
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
              value={currentUser && user && user.email}
              readOnly
              className="h-12 w-full flex flex-col items-center justify-center text-[#858585] pl-4 border rounded-md focus-within:outline-none"
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
              value={currentUser && user && currentUser.number}
              readOnly
              className="h-12 w-full flex flex-col items-center justify-center text-[#858585] pl-4 border rounded-md focus-within:outline-none"
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
            required
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            className="h-12 w-full flex flex-col items-center justify-center pl-4 border rounded-md"
          />
        </label>
        <label
          htmlFor="message"
          className="h-4/6 w-full flex flex-col items-start justify-center"
        >
          Message
          <textarea
            id="message"
            name="message"
            autoComplete="off"
            required
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="h-full w-full flex items-start justify-start border rounded-md p-4"
          />
        </label>
        <button
          type="submit"
          className="h-12 w-36 flex items-center justify-center text-[#fff] font-semibold bg-[#7d1f2e] rounded hover:bg-[#701b29] mb-4"
          disabled={!formData.subject || !formData.message}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Help;
