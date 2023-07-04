import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";

import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Close";
import capitalizeCamelCase from "utils/capitalizeCamelCase";

export interface FileInputField {
  type: "file";
  name: string;
  validator?: (value: FileList | null) => string | undefined;
  label?: string;
  multiple?: boolean;
  accept?: string;
}

interface FileInputProps {
  value: FileList | null;
  field: FileInputField;
  onChange: (name: string, value: FileList | null) => void;
  error?: string;
  disabled?: boolean;
}

const FileInput = (props: FileInputProps) => {
  const { onChange, value, field, error, disabled } = props;

  const [anchorEl, setAnchorEl] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const handleMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Typography color={error ? "error" : "inherit"}>
        {field.label ?? capitalizeCamelCase(field.name)}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button variant="outlined" component="label" disabled={disabled}>
          Upload File
          <input
            type="file"
            multiple={field.multiple}
            accept={field.accept}
            onChange={(e) => onChange(field.name, e.target.files)}
            hidden
            disabled={disabled}
          />
        </Button>
        {value?.length && (
          <>
            <Typography sx={{ ml: 2 }}>
              {value.length} File(s) selected
            </Typography>
            <IconButton onClick={handleMenu}>
              <InfoIcon />
            </IconButton>
            <Menu
              id={`menu-files-${field.name}`}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {Array.from({ length: value.length }, (_, i) => (
                <Typography sx={{ m: 1 }}>{value.item(i)!.name}</Typography>
              ))}
            </Menu>
            <IconButton
              onClick={() => onChange(field.name, null)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Box>
      <Typography variant="caption" color="error" sx={{ mt: 1, mb: 2 }}>
        {error}
      </Typography>
    </>
  );
};

export default FileInput;
