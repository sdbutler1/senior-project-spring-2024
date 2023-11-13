"use client";

// react components
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/config/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

// global states
import { useGlobalLoading } from "@/globalStates/useGlobalLoading";

// components
import CurrentUser from "./global/CurrentUser";

// icons
import { TiInputChecked } from "react-icons/ti";
import { GrFormClose } from "react-icons/gr";

type Props = {};

const UserProfile = (props: Props) => {
  const { user } = useAuth();
  const { setLoading } = useGlobalLoading();
  const [formButton, setFormButton] = useState(false);
  const currentUser = CurrentUser({});
  const [formData, setFormData] = useState({
    title: "",
    fullName: "",
    email: "",
    number: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const toggleFormButton = () => {
    setFormButton(!formButton);
    setFormData({
      title: "",
      fullName: "",
      email: "",
      number: "",
      city: "",
      state: "",
      zipCode: "",
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Get form data
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    // Create an object from form data
    const data: Record<string, string> = {};
    const fieldsToUpdate = ["city", "number", "state", "zipCode"];

    formData.forEach((value, key) => {
      if (fieldsToUpdate.includes(key)) {
        data[key] = value as string;
      }
    });

    try {
      // Reference to the user's document
      const userDocRef = doc(collection(db, "authUsers"), user.uid);

      // Update the specified fields in the user's document with the form data
      await updateDoc(userDocRef, data);

      console.log("User document updated");
      setLoading(true, 0, 2000);

      // clear the form after submission
      form.reset();
    } catch (e) {
      setLoading(true, 0, 2000);
      console.error("Error updating user document: ", e);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="h-full w-3/6 flex flex-col items-start justify-center"
      >
        <div className="h-full w-full flex flex-col items-start justify-start gap-2 text-[15px] font-semibold">
          <div className="h-auto w-full flex items-center justify-center gap-10 p-2">
            <label
              htmlFor="title"
              className="relative h-auto w-full flex flex-col items-start justify-center"
            >
              Title
              <input
                id="title"
                name="title"
                autoComplete="off"
                required
                value={
                  formButton
                    ? formData.title
                    : currentUser && user && currentUser.title
                }
                onChange={(e: any) =>
                  setFormData((formData) => ({
                    ...formData,
                    title: e.target.value,
                  }))
                }
                readOnly={!formButton}
                className={`h-12 w-full flex flex-col items-center justify-center ${
                  formButton
                    ? "text-[#464646]"
                    : "text-[#858585] focus-within:outline-none"
                } p-4 border rounded-md`}
              />
              <button
                onClick={() =>
                  setSwitchButton((prevSwitchButton) => !prevSwitchButton)
                }
                type="button"
                className="absolute top-8 right-4 h-8 w-8 flex items-center justify-center text-2xl text-black"
              >
                <TiInputChecked />  <GrFormClose />
              </button>
            </label>
            <label
              htmlFor="fullName"
              className="h-auto w-full flex flex-col items-start justify-center"
            >
              Full Name
              <input
                id="fullName"
                name="fullName"
                autoComplete="off"
                value={
                  formButton
                    ? formData.fullName
                    : currentUser &&
                      user &&
                      `${currentUser.firstName} ${currentUser.lastName}`
                }
                onChange={(e: any) =>
                  setFormData((formData) => ({
                    ...formData,
                    fullName: e.target.value,
                  }))
                }
                readOnly={!formButton}
                className={`h-12 w-full flex flex-col items-center justify-center ${
                  formButton
                    ? "text-[#464646]"
                    : "text-[#858585] focus-within:outline-none"
                } p-4 border rounded-md`}
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
              autoComplete="off"
              value={
                formButton ? formData.email : currentUser && user && user.email
              }
              onChange={(e: any) =>
                setFormData((formData) => ({
                  ...formData,
                  email: e.target.value,
                }))
              }
              readOnly={!formButton}
              className={`h-12 w-full flex flex-col items-center justify-center ${
                formButton
                  ? "text-[#464646]"
                  : "text-[#858585] focus-within:outline-none"
              } p-4 border rounded-md`}
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
              autoComplete="off"
              value={
                formButton
                  ? formData.number
                  : currentUser && user && currentUser.number
              }
              onChange={(e: any) =>
                setFormData((formData) => ({
                  ...formData,
                  number: e.target.value,
                }))
              }
              readOnly={!formButton}
              className={`h-12 w-full flex flex-col items-center justify-center ${
                formButton
                  ? "text-[#464646]"
                  : "text-[#858585] focus-within:outline-none"
              } p-4 border rounded-md`}
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
              autoComplete="off"
              value={
                formButton
                  ? formData.city
                  : currentUser && user && currentUser.city
              }
              onChange={(e: any) =>
                setFormData((formData) => ({
                  ...formData,
                  city: e.target.value,
                }))
              }
              readOnly={!formButton}
              className={`h-12 w-full flex flex-col items-center justify-center ${
                formButton
                  ? "text-[#464646]"
                  : "text-[#858585] focus-within:outline-none"
              } p-4 border rounded-md`}
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
                autoComplete="off"
                value={
                  formButton
                    ? formData.state
                    : currentUser && user && currentUser.state
                }
                onChange={(e: any) =>
                  setFormData((formData) => ({
                    ...formData,
                    state: e.target.value,
                  }))
                }
                readOnly={!formButton}
                className={`h-12 w-full flex flex-col items-center justify-center ${
                  formButton
                    ? "text-[#464646]"
                    : "text-[#858585] focus-within:outline-none"
                } p-4 border rounded-md`}
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
                autoComplete="off"
                value={
                  formButton
                    ? formData.zipCode
                    : currentUser && user && currentUser.zipCode
                }
                onChange={(e: any) =>
                  setFormData((formData) => ({
                    ...formData,
                    zipCode: e.target.value,
                  }))
                }
                readOnly={!formButton}
                className={`h-12 w-full flex flex-col items-center justify-center ${
                  formButton
                    ? "text-[#464646]"
                    : "text-[#858585] focus-within:outline-none"
                } p-4 border rounded-md`}
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
              className="h-12 w-full flex flex-col items-center justify-center text-[#858585] p-4 border rounded-md focus-within:outline-none"
            />
          </label>
        </div>
        <div className="h-full w-full flex items-center justify-end gap-20 p-2">
          {formButton && (
            <div
              onClick={toggleFormButton}
              className="h-10 w-36 flex items-center justify-center font-semibold rounded hover:bg-[#fff] cursor-pointer"
            >
              Cancel
            </div>
          )}
          {formButton ? (
            <button
              type="submit"
              className="h-10 w-36 flex items-center justify-center text-[#fff] font-semibold bg-[#7d1f2e] rounded hover:bg-[#701b29]"
            >
              Save Changes
            </button>
          ) : (
            <div
              onClick={toggleFormButton}
              className="h-10 w-36 flex items-center justify-center text-[#fff] font-semibold bg-[#7d1f2e] rounded hover:bg-[#701b29] cursor-pointer"
            >
              Edit Profile
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default UserProfile;
