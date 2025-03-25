import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  useFrappeDocTypeEventListener,
  useFrappeGetDocList,
  useFrappePostCall,
} from "frappe-react-sdk";
import { Issue } from "@/types/Support/Issue";
import { Alert, Chip, IconButton, Snackbar, Stack } from "@mui/material";
import { useState } from "react";

const statusSelector = (status: string) => {
  switch (status) {
    case "Open":
      return "primary";
    case "In Progress":
      return "warning";
    case "Closed":
      return "success";
    case "On Hold":
      return "warning";
    case "Pending":
      return "secondary";
    case "Replied":
      return "success";
    default:
      return "default";
  }
};
const Issues = () => {
  const [deleteRow, SetdeleteRow] = useState<string[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alert, setAlert] = useState("");
  const columns: GridColDef[] = [
    { field: "name", headerName: "ID", width: 130 },
    { field: "subject", headerName: "Subject", width: 180 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (param) => (
        <Chip label={param.value} color={statusSelector(param.value)} />
      ),
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 130,
    },
    { field: "raised_by", headerName: "Raised By", width: 130 },
    {
      field: "issue_type",
      headerName: "Issue Type",
      width: 130,
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const { data = [], mutate } = useFrappeGetDocList<Issue>("Issue", {
    fields: [
      "name",
      "subject",
      "status",
      "priority",
      "raised_by",
      "issue_type",
    ],
    orderBy: {
      field: "creation",
      order: "desc",
    },
  });

  useFrappeDocTypeEventListener("Issue", () => {
    mutate();
  });

  const { call } = useFrappePostCall("frappe.desk.reportview.delete_items");

  const HandelDelete = async () => {
    try {
      call({
        items: JSON.stringify(deleteRow),
        doctype: "Issue",
      });
      SetdeleteRow([]);
      mutate();
      setAlert("Selected issues deleted successfully!");
      setAlertOpen(true);
    } catch (error) {
      setAlert(error as string);
      setAlertOpen(true);
    }
  };

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {deleteRow.length > 0 && (
          <IconButton onClick={HandelDelete} color="error">
            <GridDeleteIcon />
          </IconButton>
        )}
      </Stack>
      <DataGrid
        onRowSelectionModelChange={(selectedRows) =>
          SetdeleteRow(selectedRows as string[])
        }
        rows={data}
        columns={columns}
        getRowId={(row) => row.name}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert severity="success" onClose={() => setAlertOpen(false)}>
          {alert}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Issues;
