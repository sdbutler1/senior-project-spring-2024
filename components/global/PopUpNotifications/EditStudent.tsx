"use client";

// react components
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  child,
  update,
  query,
  orderByChild,
  equalTo,
  get,
} from "firebase/database";

// global states
import { useGlobalAlert } from "@/globalStates/useGlobalAlert";

// components
import { useAuth } from "@/context/AuthContext";

type Props = {
  editPopUp: boolean;
  setEditPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  rowData: any | null;
};

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  classification: string;
  gpa: string;
}

const EditStudent = (props: Props) => {
  const { user } = useAuth();
  const { setTranslateAlert } = useGlobalAlert();
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhoneNumber, setEditPhoneNumber] = useState("");
  const [editClassification, setEditClassification] = useState("");
  const [editGPA, setEditGPA] = useState("");

  const [formData, setFormData] = useState<FormData>({
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

  const updateStudentById = async (studentId: number, formData: FormData) => {
    try {
      const database = getDatabase();
      const studentsRef = ref(database, "/");

      // Find the student node with the given ID
      const studentQuery = query(
        studentsRef,
        orderByChild("id"),
        equalTo(studentId)
      );
      const snapshot = await get(studentQuery);

      if (snapshot.exists()) {
        // Get the key of the student node
        const studentKey = Object.keys(snapshot.val())[0];

        // Get the existing data of the student
        const existingData = snapshot.val()[studentKey];

        // Update only non-empty values in formData
        const updatedData: { [key: string]: any } = {};
        for (const [key, value] of Object.entries(formData)) {
          if (value !== "") {
            updatedData[key] = value;
          } else if (existingData.hasOwnProperty(key)) {
            // If the value is empty but the key exists in the existing data, keep the existing value
            updatedData[key] = existingData[key];
          }
        }

        // Update the student node in the database with updatedData
        await update(child(studentsRef, studentKey), updatedData);
      } else {
        setTranslateAlert(
          true,
          `Student with ID ${studentId} not found.`,
          "error"
        );
      }
    } catch (error) {
      setTranslateAlert(true, "Unable to update student. Try again", "error");
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateStudentById(props.rowData.id, formData);
    props.setEditPopUp(false);
  };

  useEffect(() => {
    const closePopupsOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".addPopup")) {
        props.setEditPopUp(false);
      }
    };
    document.addEventListener("click", closePopupsOnOutsideClick);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      classification: "",
      gpa: "",
    });

    return () => {
      document.removeEventListener("click", closePopupsOnOutsideClick);
    };
  }, [props, props.editPopUp, props.setEditPopUp]);

  return (
    <div
      className={`addPopup absolute top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[30rem] w-80 md:w-[26rem] ${
        props.editPopUp ? "flex" : "hidden"
      } flex-col items-start justify-start gap-8 bg-[#7d1f2df9] text-[#fff] py-4 px-8 rounded-lg border border-[#d8495e] mt-20 shadow-xl overflow-auto z-50`}
    >
      <h1 className="flex items-center justify-start text-2xl font-semibold">
        Edit Student
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-6"
      >
        <div className="w-full flex flex-col items-start justify-center">
          <label
            htmlFor="bearsId"
            className="h-full flex items-end justify-start font-montserrat mb-2"
          >
            BearsId
          </label>
          <input
            type="text"
            id="bearsId"
            name="bearsId"
            autoComplete="off"
            value={props.rowData && props.rowData.id}
            readOnly
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
              placeholder={props.rowData && props.rowData.firstName}
              value={formData.firstName}
              onChange={handleChange}
              onFocus={() => setEditFirstName("firstName")}
              className="h-8 w-full flex items-center justify-start text-sm bg-transparent border-b outline-none placeholder:text-white"
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
              placeholder={props.rowData && props.rowData.lastName}
              value={formData.lastName}
              onChange={handleChange}
              onFocus={() => setEditLastName("lastName")}
              className="h-8 w-full flex items-center justify-start text-sm bg-transparent border-b outline-none placeholder:text-white"
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
              placeholder={props.rowData && props.rowData.email}
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setEditEmail("email")}
              className="h-8 w-full flex items-center justify-start text-sm bg-transparent border-b outline-none placeholder:text-white"
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="number" className="font-montserrat">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="off"
              placeholder={props.rowData && props.rowData.phone}
              value={formData.phone}
              onChange={handleChange}
              onFocus={() => setEditPhoneNumber("phone")}
              className="h-8 w-full flex items-center justify-start text-sm bg-transparent border-b outline-none placeholder:text-white"
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
              placeholder={props.rowData && props.rowData.classification}
              value={formData.classification}
              onChange={handleChange}
              onFocus={() => setEditClassification("classification")}
              className="h-8 w-full flex items-center justify-start text-sm bg-transparent border-b outline-none placeholder:text-white"
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
              placeholder={props.rowData && props.rowData.gpa}
              value={formData.gpa}
              onChange={handleChange}
              onFocus={() => setEditGPA("gpa")}
              className="h-8 w-full flex items-center justify-start text-sm bg-transparent border-b outline-none placeholder:text-white"
            />
          </div>
        </div>
        <button
          type="submit"
          className="h-10 w-36 flex items-center justify-center text-[#000] font-semibold bg-[#fff] rounded hover:bg-[#f4f4f4] mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
