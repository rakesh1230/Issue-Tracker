import {
  DataGrid,
  GridColDef,
  GridDeleteIcon,
  GridRenderCellParams,
  useGridApiContext,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  useFrappeDocTypeEventListener,
  useFrappeGetDocList,
  useFrappePostCall,
  useFrappeUpdateDoc,
} from "frappe-react-sdk";
import { Issue } from "@/types/Support/Issue";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Stack,
} from "@mui/material";
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

function SelectEditStatusCell(
  props: GridRenderCellParams & {
    updateDoc: (doctype: string, id: string, data: any) => Promise<void>;
  }
) {
  const { id, value, field, updateDoc } = props;
  const apiRef = useGridApiContext();
  const handleChange = async (event: SelectChangeEvent) => {
    await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value,
    });

    await updateDoc("Issue", id as string, { status: event.target.value });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      size="small"
      autoFocus
      fullWidth
    >
      <MenuItem value="Open">Open</MenuItem>
      <MenuItem value="Replied">Replied</MenuItem>
      <MenuItem value="On Hold">On Hold</MenuItem>
      <MenuItem value="Resolved">Resolved</MenuItem>
      <MenuItem value="Closed">Closed</MenuItem>
    </Select>
  );
}

const Issues = () => {
  const { updateDoc } = useFrappeUpdateDoc<Issue>("Issue");
  const [deleteRow, setDeleteRow] = useState<string[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alert, setAlert] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: "name", headerName: "ID", width: 130 },
    { field: "subject", headerName: "Subject", width: 180 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderEditCell: (params) => (
        <SelectEditStatusCell {...params} updateDoc={updateDoc} />
      ),
      editable: true,
      renderCell: (param) => (
        <Chip label={param.value} color={statusSelector(param.value)} />
      ),
    },
    { field: "priority", headerName: "Priority", width: 130, editable: true },
    { field: "raised_by", headerName: "Raised By", width: 130 },
    { field: "issue_type", headerName: "Issue Type", width: 130 },
  ];

  const paginationModel = { page: 0, pageSize: 10 };
  const { data = [], mutate } = useFrappeGetDocList<Issue>("Issue", {
    fields: [
      "name",
      "subject",
      "status",
      "priority",
      "raised_by",
      "issue_type",
    ],
    orderBy: { field: "creation", order: "desc" },
  });

  useFrappeDocTypeEventListener("Issue", () => mutate());

  const { call } = useFrappePostCall("frappe.desk.reportview.delete_items");
  const handleDelete = async () => {
    try {
      await call({ items: JSON.stringify(deleteRow), doctype: "Issue" });
      setDeleteRow([]);
      mutate();
      setAlert("Selected issues deleted successfully!");
      setAlertOpen(true);
    } catch (error) {
      setAlert(error as string);
      setAlertOpen(true);
    }
    setDialogOpen(false);
  };

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box sx={{ flexGrow: 1 }} />
        {deleteRow.length > 0 && (
          <IconButton onClick={() => setDialogOpen(true)} color="error">
            <GridDeleteIcon />
          </IconButton>
        )}
      </Stack>
      <DataGrid
        onRowSelectionModelChange={(selectedRows) =>
          setDeleteRow(selectedRows as string[])
        }
        rows={data}
        columns={columns}
        getRowId={(row) => row.name}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{ border: 0 }}
      />
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the selected Issue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button color="error" onClick={handleDelete} variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
