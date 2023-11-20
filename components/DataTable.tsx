"use client";

// react components
import React, { useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import {
  getDatabase,
  ref,
  child,
  remove,
  query,
  orderByChild,
  equalTo,
  get,
} from "firebase/database";

// global states
import { useGlobalAlert } from "@/globalStates/useGlobalAlert";

// components
import EditStudent from "@/components/global/PopUpNotifications/EditStudent";

//icons
import { MdEdit, MdDelete } from "react-icons/md";
import { TiUserDelete } from "react-icons/ti";
import { IoClose } from "react-icons/io5";

type Props = {
  columns: GridColDef[];
  rows: object[];
  handleRowSelection: (data: any) => void;
};

const DataTable = (props: Props) => {
  const { setTranslateAlert } = useGlobalAlert();
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [selectedRowData, setSelectedRowData] = useState<any | null>(null);
  const [editPopUp, setEditPopUp] = useState(false);

  const handleEdit = (rowData: any) => {
    setSelectedRowData(rowData);
    setEditPopUp(true);
  };

  const deleteStudentById = async (studentId: number) => {
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

        // Remove the student node from the database
        await remove(child(studentsRef, studentKey));
      } else {
        setTranslateAlert(
          true,
          `Student with ID ${studentId} not found.`,
          "error"
        );
      }
    } catch (error) {
      setTranslateAlert(true, "Unable to delete student. Try again", "error");
      throw error;
    }
  };

  const handleDelete = async (studentId: number) => {
    try {
      await deleteStudentById(studentId);
      setSelectedRowId(null);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    headerAlign: "left",
    width: 200,
    renderCell: (params) => {
      const isRowSelected = selectedRowId === params.row.id;

      return (
        <div className="dataTable w-[40rem] h-[5rem] flex items-center justify-start">
          {isRowSelected ? (
            <div className="flex items-center justify-center gap-1">
              <button type="button" onClick={() => handleDelete(params.row.id)}>
                <TiUserDelete className="text-xl text-[#7d1f2e]" />
              </button>
              <button type="button" onClick={() => setSelectedRowId(null)}>
                <IoClose className="text-xl" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1">
              <button
                type="button"
                onClick={() => (
                  setEditPopUp(!editPopUp), handleEdit(params.row)
                )}
                className="addPopup"
              >
                <MdEdit className="text-xl text-[#327123]" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedRowId(params.row.id)}
              >
                <MdDelete className="text-xl text-[#7d1f2e]" />
              </button>
            </div>
          )}
        </div>
      );
    },
  };

  return (
    <div className="dataTable h-[45rem] w-[80rem] 2xl:w-full ml-[60rem] md:ml-[35rem] xl:ml-80 2xl:ml-0 mr-8 2xl:mr-0 px-8">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 100 },
          },
        }}
        onRowSelectionModelChange={props.handleRowSelection}
        pageSizeOptions={[15]}
        checkboxSelection
        disableRowSelectionOnClick
        disableDensitySelector
        disableColumnSelector
      />
      <EditStudent
        editPopUp={editPopUp}
        setEditPopUp={setEditPopUp}
        rowData={selectedRowData}
      />
    </div>
  );
};

export default DataTable;
