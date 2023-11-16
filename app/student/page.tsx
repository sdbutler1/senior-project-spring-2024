"use client";

// react components
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDatabase, ref, get, onValue } from "firebase/database";

// global states
import { useGlobalAlert } from "@/globalStates/useGlobalAlert";
import { useGlobalLoading } from "@/globalStates/useGlobalLoading";

//components
import { useAuth } from "@/context/AuthContext";
import AddStudent from "@/components/global/PopUpNotifications/AddStudent";
import DataTable from "@/components/DataTable";
import EmailModal from "@/components/global/EmailModal";

// assets
import { GridColDef } from "@mui/x-data-grid";

// icons
import { HiUserAdd } from "react-icons/hi";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { BsSearch } from "react-icons/bs";
import { MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/20/solid";

type Props = {};

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  classification: string;
  gpa: number;
}

type studentsFormatted = {
  [id: number]: student;
};

const columns: GridColDef[] = [
  { field: "id", headerName: "Bears ID", width: 90 },
  {
    field: "firstName",
    type: "string",
    headerName: "First name",
    flex: 1,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last name",
    flex: 1,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    flex: 2,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    flex: 1,
  },
  {
    field: "classification",
    headerName: "Classification",
    type: "string",
    flex: 1,
  },
  {
    field: "gpa",
    headerName: "GPA",
    type: "number",
    flex: 1,
    headerAlign: "left",
    align: "left",
  },
];

const StudentTable = (props: Props) => {
  const { user } = useAuth();
  const router = useRouter();
  const [addPopUp, setAddPopUp] = useState(false);
  const { setTranslateAlert } = useGlobalAlert();
  const { setLoading } = useGlobalLoading();
  const [modalShown, setModalShown] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<student[]>([]);
  const [formattedStudentData, setFormattedStudentData] =
    useState<studentsFormatted>();

  const [students, setStudents] = useState<Student[]>([]);

  // Helper function to compare arrays
  function arraysEqual(a: Student[], b: Student[]): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  useEffect(() => {
    if (user) {
      const database = getDatabase();
      const studentsRef = ref(database, "/");

      const fetchData = async () => {
        try {
          const snapshot = await get(studentsRef);

          // Explicitly define the type of studentList based on the Student interface
          const studentList: Student[] = [];

          snapshot.forEach((childSnapshot) => {
            const studentData = childSnapshot.val();
            studentList.push({
              id: studentData.id,
              firstName: studentData.firstName,
              lastName: studentData.lastName,
              email: studentData.email,
              phone: studentData.phone,
              classification: studentData.classification,
              gpa: studentData.gpa,
            });
          });

          setStudents(studentList);

          // Compare previous and current states
          if (students.length !== 0 && !arraysEqual(students, studentList)) {
            setTranslateAlert(
              true,
              "One moment, the Student Table has been updated.",
              "info"
            );
            setLoading(true, 2000, 1000);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      // Set up a listener for real-time updates
      const unsubscribe = onValue(studentsRef, fetchData);

      // Cleanup function to unsubscribe when the component unmounts or when the user changes
      return () => {
        unsubscribe();
      };
    }
  }, [user, students, setTranslateAlert, setLoading]);

  const handleRowSelection = (data: any) => {
    const recipients: student[] = data.map(
      (studentId: any) =>
        formattedStudentData && formattedStudentData[studentId]
    );
    setSelectedRows(recipients);
  };

  useEffect(() => {
    const data: studentsFormatted = {};

    students.forEach((student) => {
      data[student.id] = student;
    });

    setFormattedStudentData(data);
  }, [students]);

  const closeModal = () => {
    setModalShown((state) => !state);
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  useEffect(() => {
    const closePopupsOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".addPopup")) {
        setAddPopUp(false);
      }
    };
    document.addEventListener("click", closePopupsOnOutsideClick);
    return () => {
      document.removeEventListener("click", closePopupsOnOutsideClick);
    };
  }, [setAddPopUp]);

  return (
    <>
      {modalShown && (
        <EmailModal
          recipients={selectedRows.length ? selectedRows : students}
          modalShown={modalShown}
          closeModal={closeModal}
        />
      )}
      <div className="h-2/6 w-full flex flex-col items-center justify-center gap-2 overflow-x-auto">
        <div className="w-full flex flex-col items-start justify-center gap-2 py-4 px-8 mb-2 2xl:gap-4 2xl:mb-6">
          <h1 className="text-2xl md:text-4xl font-bold">Students</h1>
          <div className="h-full w-full flex items-center justify-between">
            <div className="flex items-center justify-start gap-4">
              <button
                onClick={() => setAddPopUp(!addPopUp)}
                className="addPopup w-auto flex items-center justify-center gap-2 text-sm 2xl:text-lg rounded-md bg-shaw-garnet hover:opacity-100 opacity-90 text-white px-2 py-1"
              >
                <span>Add Student</span>
                <PersonAddAltOutlinedIcon className="w-6" />
              </button>
              <button
                onClick={() => setModalShown((state) => !state)}
                className="w-auto flex items-center justify-center gap-2 text-sm 2xl:text-lg rounded-md bg-shaw-garnet hover:opacity-100 opacity-90 text-white px-2 py-1"
              >
                <span>Send email</span>
                <EmailOutlinedIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        <DataTable
          handleRowSelection={handleRowSelection}
          columns={columns}
          rows={students}
        />
      </div>
      <AddStudent addPopUp={addPopUp} setAddPopUp={setAddPopUp} />;
    </>
  );
};

export default StudentTable;
