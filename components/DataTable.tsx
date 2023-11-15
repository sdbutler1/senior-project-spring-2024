"use client";

// react components
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

//icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

type Props = {
  columns: GridColDef[];
  rows: object[];
  handleRowSelection: (data: any) => void;
};

const DataTable = (props: Props) => {
  const { setTranslateAlert } = useGlobalAlert();
  
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
      console.log("Student deleted successfully.");
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
      return (
        <div className="w-40 flex items-center justify-start gap-4">
          <button
            type="button"
            onClick={() => console.log(params.row.id)}
            className="cursor-pointer"
          >
            <EditIcon className="text-[#327123]" />
          </button>
          <button
            type="button"
            onClick={() => handleDelete(params.row.id)}
            className="cursor-pointer"
          >
            <DeleteIcon className="text-[#7d1f2e]" />
          </button>
        </div>
      );
    },
  };
  return (
    <div className="dataTable w-full max-h-[90%] overflow-y-auto">
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
    </div>
  );
};

export default DataTable;
