import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { HTMLInputTypeAttribute } from "react";
import capitalizeCamelCase from "utils/capitalizeCamelCase";

export interface TextInputField {
  type: "text";
  name: string;
  validator?: (value: string) => string | undefined;
  label?: string;
  initialValue?: string;
  multiline?: boolean;
  inputType?: HTMLInputTypeAttribute;
}

interface TextInputProps {
  value: string;
  field: TextInputField;
  onChange: (name: string, value: string) => void;
  disabled?: boolean;
  error?: string;
  autoFocus?: boolean;
}

const TextInput = (props: TextInputProps) => {
  const { value, field, onChange, disabled, error, autoFocus } = props;

  return (
    <>
      <TextField
        value={value}
        fullWidth
        autoFocus={autoFocus}
        label={field.label ?? capitalizeCamelCase(field.name)}
        onChange={(e) => onChange(field.name, e.target.value)}
        multiline={field.multiline}
        minRows={field.multiline ? 3 : undefined}
        error={error !== undefined}
        disabled={disabled}
        type={field.inputType}
      />
      <Typography variant="caption" color="error" sx={{ mt: 1, mb: 2 }}>
        {error}
      </Typography>
    </>
  );
};

export default TextInput;
