import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import React from "react";
import capitalizeCamelCase from "utils/capitalizeCamelCase";
import { ChoiceItems } from "./RadioInput";

export interface SelectInputField {
  type: "select";
  name: string;
  items: ChoiceItems[];
  validator?: (value: string) => string | undefined;
  label?: string;
  initialValue?: string;
}

interface SelectInputProps {
  value: string;
  field: SelectInputField;
  onChange: (name: string, value: string) => void;
  disabled?: boolean;
  error?: string;
  autoFocus?: boolean;
}

const SelectInput = (props: SelectInputProps) => {
  const { value, field, onChange, disabled, error, autoFocus } = props;

  return (
    <FormControl fullWidth>
      <InputLabel id={`${field.name}-label`}>
        {field.label ?? capitalizeCamelCase(field.name)}
      </InputLabel>
      <Select
        labelId={`${field.name}-label`}
        id={field.name}
        value={value}
        disabled={disabled}
        error={error !== undefined}
        autoFocus={autoFocus}
        // value={age}
        label={field.label ?? capitalizeCamelCase(field.name)}
        onChange={(e) => onChange(field.name, e.target.value)}
      >
        {field.items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      <Typography variant="caption" color="error" sx={{ mt: 1, mb: 2 }}>
        {error}
      </Typography>
    </FormControl>
  );
};

export default SelectInput;
