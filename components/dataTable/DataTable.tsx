import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.css";

// react icons
import Link from "next/link";

//icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  handleRowSelection: (data: any) => void;
};

const DataTable = (props: Props) => {
  const handleDelete = (id: number) => {
    //delete the item
    // mutation.mutate(id)
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    headerAlign: "left",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="w-40 flex items-center justify-start gap-4">
          <button type="button">
            <Link
              href={`/${props.slug}/${params.row.id}`}
              className="cursor-pointer"
            >
              <EditIcon className="text-[#327123]" />
            </Link>
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
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
