"use client";

// react components
import React, { useState } from "react";

// assets
import { StudentData } from "./studentData";
import { Box } from "@mui/material";
import { GridCellParams, GridColDef, DataGrid } from "@mui/x-data-grid";

// icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

type EditableFieldProps = {
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => void;
  onCancel: () => void;
};

const EditableField: React.FC<EditableFieldProps> = ({
  isEditing,
  onEdit,
  onDelete,
  onSave,
  onCancel,
}) => {
  return (
    <div>
      {isEditing ? (
        <span className="flex gap-2">
          <SaveIcon style={{ color: "#1e6834" }} onClick={onSave} />
          <CancelIcon style={{ color: "#000" }} onClick={onCancel} />
        </span>
      ) : (
        <span className="flex gap-2">
          <EditIcon style={{ color: "#5f7076" }} onClick={onEdit} />
          <DeleteIcon style={{ color: "#842a37" }} onClick={onDelete} />
        </span>
      )}
    </div>
  );
};

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Other code...

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Add logic to save the data here
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Add logic to cancel editing here
  };

  const handleDeleteClick = () => {
    // Add logic to delete the data here
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Bears Id",
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      width: 150,
    },
    {
      field: "firstName",
      headerName: "First Name",
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      width: 200,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      width: 200,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      width: 270,
      editable: true,
    },
    {
      field: "classification",
      headerName: "Classification",
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      width: 250,
      editable: true,
    },
    {
      field: "gpa",
      headerName: "GPA",
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      width: 150,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params: GridCellParams) => (
        <EditableField
          isEditing={isEditing}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onSave={handleSaveClick}
          onCancel={handleCancelClick}
        />
      ),
    },
  ];

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Box>
        <Box>
          <div className="text-5xl tracking-wide font-sans font-semibold ">
            Students
          </div>
          <Box
            m="20px 0"
            height="74vh"
            width={"75vw"}
            sx={{
              "& .MuiDataGrid-columnHeaderDraggableContainer": {
                backgroundColor: "#8c2333",
                color: "#fff",
              },
              "& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.css-i4bv87-MuiSvgIcon-root":
                {
                  color: "#a5884a",
                },
              "& .css-wop1k0-MuiDataGrid-footerContainer": {
                backgroundColor: "#8c2333",
                color: "#fff",
              },
              "& .css-rtrcn9-MuiTablePagination-root": {
                color: "#fff",
              },
              "& .css-zylse7-MuiButtonBase-root-MuiIconButton-root.Mui-disabled":
                {
                  color: "#fff",
                },
              "& .MuiDataGrid-main ": {
                backgroundColor: "#f8f8f8",
              },
              // "& .MuiDataGrid-virtualScroller": {
              //   width: "4px",
              // },
            }}
          >
            <DataGrid
            className="gridBorder"
              sx={{
                boxShadow: 2,
                border: 2,
                borderColor: "#fff",
                "& .super-app-theme--header": {
                  backgroundColor: "#8c2333",
                  color: "#fff",
                },
                "& .super-app-theme--cell": {
                  backgroundColor: "#f8f8f8",
                  color: "#000",
                },
              }}
              rows={StudentData}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 15,
                  },
                },
              }}
              pageSizeOptions={[15]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Page;
