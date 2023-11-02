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
};

const DataTable = (props: Props) => {
  const handleDelete = (id: number) => {
    //delete the item
    // mutation.mutate(id)
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    width: 200,
    align: "center",
    renderCell: (params) => {
      return (
        <div className="flex items-center justify-center gap-2 ">
          <Link
            href={`/${props.slug}/${params.row.id}`}
            className="cursor-pointer"
          >
            <EditIcon className="text-[#327123]" />
          </Link>
          <div
            onClick={() => handleDelete(params.row.id)}
            className="cursor-pointer"
          >
            <DeleteIcon className="text-[#7d1f2e]" />
          </div>
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
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
