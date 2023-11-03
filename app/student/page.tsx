"use client";

// react components
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// global states
import { globalSideBar } from "../../globalStates/globalSideBar";

//components
import { useAuth } from "@/context/AuthContext";
import Add from "@/components/add/Add";
import DataTable from "@/components/dataTable/DataTable";
import EmailModal from "@/components/global/EmailModal";

// assets
import { GridColDef } from "@mui/x-data-grid";
import { StudentData } from "@/app/student/studentData";

// icons
import { HiUserAdd } from "react-icons/hi";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { BsSearch } from "react-icons/bs";
import { MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/20/solid";

type Props = {};

type studentsFormatted = {
  [id: number]: student;
};

const columns: GridColDef[] = [
  { field: "id", headerName: "BearsId", width: 90 },
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
  },
];

const StudentTable = (props: Props) => {
  const { isSidebarOpen, isSidebarHidden } = globalSideBar();
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [modalShown, setModalShown] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<student[]>([]);
  const [formattedStudentData, setFormattedStudentData] =
    useState<studentsFormatted>();

  const handleRowSelection = (data: any) => {
    const recipients: student[] = data.map(
      (studentId: any) =>
        formattedStudentData && formattedStudentData[studentId]
    );
    setSelectedRows(recipients);
  };

  useEffect(() => {
    const data: studentsFormatted = {};

    StudentData.forEach((student) => {
      data[student.id] = student;
    });

    setFormattedStudentData(data);
  }, []);

  const closeModal = () => {
    setModalShown((state) => !state);
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  return (
    <>
      {modalShown && (
        <EmailModal
          recipients={selectedRows.length ? selectedRows : StudentData}
          modalShown={modalShown}
          closeModal={closeModal}
        />
      )}
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex flex-col items-start justify-center gap-2 mb-2 2xl:gap-4 2xl:mb-6">
          <h1 className="text-2xl md:text-4xl font-bold">Students</h1>
          <div className="h-full w-full flex items-center justify-between">
            <div className="flex items-center justify-start gap-4">
              <button
                onClick={() => setOpen(true)}
                className="w-auto flex items-center justify-center gap-2 text-sm 2xl:text-lg rounded-md bg-shaw-garnet hover:opacity-100 opacity-90 text-white px-2 py-1"
              >
                <span>Add Student</span>
                <PersonAddAltOutlinedIcon className="w-6" />
              </button>
              <button
                onClick={() => setModalShown((state) => !state)}
                className="w-auto flex items-center justify-center gap-2 text-sm 2xl:text-lg rounded-md bg-shaw-garnet hover:opacity-100 opacity-90 text-white px-2 py-1"
              >
                <span>Send email</span>
                <EmailOutlinedIcon className="w-6" />
              </button>
            </div>
            </div>
        </div>

        <DataTable handleRowSelection={handleRowSelection} slug="users" columns={columns} rows={StudentData} />
        {open && <Add slug="student" columns={columns} setOpen={setOpen} />}
      </div>
    </>
  );
};

export default StudentTable;
