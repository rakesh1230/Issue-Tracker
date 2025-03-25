import { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, Icon, InputLabel, MenuItem, Select } from "@mui/material";
import LinkField from "../Field/LinkField";
import { useFrappeCreateDoc } from "frappe-react-sdk";

const Createissue = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("Open");
  const [priority, setPriority] = useState("");
  const [issue_type, setType] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const { createDoc, loading } = useFrappeCreateDoc();

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStatus("Open");
    setPriority("");
    setType("");
    setSubject("");
    setDescription("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const issueData = {
      subject,
      status,
      priority,
      issue_type,
      description,
    };

    try {
      const response = await createDoc("Issue", issueData);
      console.log("Issue Created:", response);
      handleClose();
    } catch (error) {
      console.error("Error creating issue:", error);
    }
  };

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="contained"
          onClick={handleClickOpen}
          className="btn btn-primary"
          sx={{ textTransform: "none" }}
        >
          <Icon>add_circle</Icon>
          Issue
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Issue</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter issue details below:</DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              required
              margin="dense"
              label="Subject"
              type="text"
              fullWidth
              variant="standard"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              sx={{ marginBottom: 3 }}
            />
            <FormControl fullWidth sx={{ marginBottom: 3 }}>
              <InputLabel>Status</InputLabel>
              <Select value={status} onChange={handleChangeStatus}>
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Replied">Replied</MenuItem>
                <MenuItem value="On Hold">On Hold</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
            </FormControl>
            <LinkField
              doctype="Issue Priority"
              value={priority}
              onChange={setPriority}
            />
            <LinkField
              doctype="Issue Type"
              value={issue_type}
              onChange={setType}
            />
            <TextField
              label="Description"
              placeholder="Enter description..."
              multiline
              rows={4}
              fullWidth
              variant="standard"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ marginBottom: 3 }}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default Createissue;
