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
import { BsSearch } from "react-icons/bs";

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
    width: 200,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 350,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "classification",
    headerName: "Classification",
    width: 100,
    type: "string",
  },
  {
    field: "gpa",
    headerName: "GPA",
    width: 100,
    type: "number",
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
    const recipients = data.map(
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
    console.log(data);
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
    <div
      className={`absolute bottom-0 right-0 h-[calc(100%-5rem)] p-8 ${
        isSidebarOpen && isSidebarHidden
          ? "w-screen lg:w-[calc(100%-12rem)]"
          : !isSidebarOpen && !isSidebarHidden
          ? "w-screen"
          : !isSidebarOpen &&
            isSidebarHidden &&
            "w-screen lg:w-[calc(100%-5rem)]"
      } flex items-center justify-center gap-8 transition-width duration-500`}
    >
      {modalShown && (
        <EmailModal
          recipients={selectedRows}
          modalShown={modalShown}
          closeModal={closeModal}
        />
      )}
      <div>
        <div className="h-auto w-full flex flex-col items-start justify-center gap-4 mb-6">
          <h1 className="text-2xl md:text-4xl font-bold">Students</h1>
          <div className="h-full w-full flex items-center justify-between">
            <div className="flex items-center justify-start gap-8">
              <button
                onClick={() => setOpen(true)}
                className="h-12 w-auto flex items-center justify-center gap-2 text-lg rounded-md bg-shaw-garnet text-white p-2"
              >
                Add Student <HiUserAdd className="text-xl" />
              </button>
              <button
                onClick={() => setModalShown((state) => !state)}
                className="h-12 w-auto flex items-center justify-center gap-2 text-lg rounded-md bg-shaw-garnet text-white p-2"
              >
                <span>Send email</span>
                <EmailOutlinedIcon />
              </button>
            </div>

            <div className="h-[3.5rem] w-80 flex items-center justify-center bg-shaw-garnet rounded-md">
              <form className="h-full w-full ">
                <label className="h-full w-full flex items-center justify-start text-lg px-4 gap-2">
                  <div
                    className={`h-full w-1/6 flex items-center justify-center text-xl cursor-pointer text-[#fff] hover:text-[#f4b461]`}
                  >
                    <BsSearch />
                  </div>
                  <input
                    type="text"
                    id="search"
                    name="search"
                    autoComplete="off"
                    placeholder="Search..."
                    className={`w-full bg-transparent outline-none p-2 focus:border-b placeholder:text-[#fff] ${
                      isSidebarOpen ? "flex" : "hidden"
                    }`}
                  />
                </label>
              </form>
            </div>
          </div>
        </div>
        <DataTable slug="users" columns={columns} rows={StudentData} />
        {open && <Add slug="student" columns={columns} setOpen={setOpen} />}
      </div>
    </div>
  );
};

export default StudentTable;
