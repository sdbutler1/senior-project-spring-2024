"use client";

// react components
import React, { ChangeEvent, useState } from "react";
import { getDatabase, ref, push } from "firebase/database";

// global states
import { useGlobalAlert } from "@/globalStates/useGlobalAlert";

// components
import { useAuth } from "@/context/AuthContext";

type Props = {
  addPopUp: boolean;
  setAddPopUp: React.Dispatch<React.SetStateAction<boolean>>;
};

interface FormData {
  bearsId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  classification: string;
  gpa: string;
}

const AddStudent = (props: Props) => {
  const { user } = useAuth();
  const { setTranslateAlert } = useGlobalAlert();
  const [formData, setFormData] = useState<FormData>({
    bearsId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    classification: "",
    gpa: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (user) {
        const database = getDatabase();
        const studentsRef = ref(database, "/");

        // Create a new student object with form data
        const newStudent = {
          id: formData.bearsId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          classification: formData.classification,
          gpa: formData.gpa,
        };

        // Add the new student to the database
        await push(studentsRef, newStudent);

        // Clear the form data after successful submission
        setFormData({
          bearsId: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          classification: "",
          gpa: "",
        });

        props.setAddPopUp(false);
      }
    } catch (error) {
      setTranslateAlert(true, "Unable to add student. Try again", "error");
    }
  };

  const isFormIncomplete = Object.values(formData).some(
    (value) => value === ""
  );

  return (
    <div
      className={`addPopup absolute top-80 left-[42%] h-[30rem] w-[26rem] ${
        props.addPopUp ? "flex" : "hidden"
      } flex-col items-start justify-center gap-8 bg-[#7d1f2df9] text-[#fff] px-8 rounded-lg border-2 border-[#d8495e] shadow-xl`}
    >
      <h1 className="flex items-center justify-start text-2xl font-semibold">
        Add New Student
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-6"
      >
        <div className="w-full flex flex-col items-start justify-center">
          <label htmlFor="bearsId" className="h-full flex items-end justify-start font-montserrat mb-2">
            BearsId
          </label>
          <input
            type="text"
            id="bearsId"
            name="bearsId"
            autoComplete="off"
            required
            value={formData.bearsId}
            onChange={handleChange}
            className="h-8 w-full flex items-center justify-start text-sm bg-transparent border-b outline-none"
          />
        </div>
        <div className="flex items-center justify-center gap-12">
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="firstName" className="font-montserrat">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              autoComplete="off"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="h-8 w-full flex items-center justify-start text-sm bg-transparent border-b outline-none"
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="lastName" className="font-montserrat">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              autoComplete="off"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="h-8 w-full flex items-center justify-start text-sm bg-transparent border-b outline-none"
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-12">
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="email" className="font-montserrat">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              required
              value={formData.email}
              onChange={handleChange}
              className="h-8 w-full flex items-center justify-start text-sm bg-transparent border-b outline-none"
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="phone" className="font-montserrat">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="off"
              required
              value={formData.phone}
              onChange={handleChange}
              className="h-8 w-full flex items-center justify-start text-sm bg-transparent border-b outline-none"
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-12">
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="classification" className="font-montserrat">
              Classification
            </label>
            <input
              type="text"
              id="classification"
              name="classification"
              autoComplete="off"
              required
              value={formData.classification}
              onChange={handleChange}
              className="h-8 w-full flex items-center justify-start text-sm bg-transparent border-b outline-none"
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="gpa" className="font-montserrat">
              GPA
            </label>
            <input
              type="text"
              id="gpa"
              name="gpa"
              autoComplete="off"
              required
              value={formData.gpa}
              onChange={handleChange}
              className="h-8 w-full flex items-center justify-start text-sm bg-transparent border-b outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          className="disabled:opacity-50 h-10 w-36 flex items-center justify-center text-[#000] font-semibold bg-[#fff] rounded hover:bg-[#f4f4f4] mt-2"
          disabled={isFormIncomplete}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
