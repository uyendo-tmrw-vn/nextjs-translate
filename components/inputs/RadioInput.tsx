import React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import capitalizeCamelCase from "utils/capitalizeCamelCase";

export interface RadioInputField {
  type: "radio";
  name: string;
  validator?: (value: string | undefined) => string | undefined;
  items: ChoiceItems[];
  label?: string;
  initialValue?: string;
}

export interface ChoiceItems {
  name: string;
  value: string;
}

interface RadioInputProps {
  value: string;
  field: RadioInputField;
  onChange: (name: string, value: string | undefined) => void;
  disabled?: boolean;
  error?: string;
}

const RadioInput = (props: RadioInputProps) => {
  const { value, field, onChange, disabled, error } = props;
  return (
    <FormControl component="fieldset" sx={{ mb: 2 }}>
      <FormLabel component="legend" sx={{ color: error ? "red" : "black" }}>
        {field.label ?? capitalizeCamelCase(field.name)}
      </FormLabel>
      <RadioGroup
        row
        name="row-radio-buttons-group"
        onChange={(e) => onChange(field.name, e.target.value)}
      >
        {field.items.map((item) => (
          <FormControlLabel
            checked={value === item.value}
            key={item.value}
            value={item.value}
            control={<Radio />}
            label={item.name}
            disabled={disabled}
            sx={error ? { color: "red" } : undefined}
          />
        ))}
      </RadioGroup>
      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 1, mb: 2 }}>
          {error}
        </Typography>
      )}
    </FormControl>
  );
};

export default RadioInput;
