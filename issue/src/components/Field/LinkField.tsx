import { Autocomplete, TextField } from "@mui/material";
import { Filter, useSearch } from "frappe-react-sdk";
import { useState } from "react";

type Props = {
  doctype: string;
  value?: string;
  onChange: (value: string) => void;
  filters?: Filter[];
};
const LinkField = ({ doctype, value, onChange, filters }: Props) => {
  const [search, setSearch] = useState("");
  const { data } = useSearch(doctype, search, filters);
  return (
    <Autocomplete
      disablePortal
      options={data?.message ? data?.message.map((item) => item.value) : []}
      sx={{ width: 300, marginBottom: 2 }}
      autoHighlight
      value={value || ""}
      onInputChange={(_, newValue) => setSearch(newValue)}
      onChange={(_, newValue) => onChange(newValue || "")}
      renderInput={(data) => <TextField {...data} label={doctype} />}
    />
  );
};

export default LinkField;
