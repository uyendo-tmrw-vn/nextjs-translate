import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Close";
import capitalizeCamelCase from "utils/capitalizeCamelCase";

export interface ArrayInputField {
  type: "array";
  name: string;
  labels?: string[];
  validator?: (value: string[]) => string | undefined;
  label?: string;
  initialValue?: string[];
  hideButtons?: boolean;
  min?: number;
  max?: number;
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
}

interface ArrayInputProps {
  value: string[];
  field: ArrayInputField;
  onChange: (name: string, value: string[]) => void;
  disabled?: boolean;
  error?: string;
  autoFocus?: boolean;
  type?: string;
}

const ArrayInput = (props: ArrayInputProps) => {
  const { value, field, onChange, disabled, error, autoFocus, type } = props;

  const handleChange = (inputValue: string, index: number) => {
    const newValue = [...value];
    newValue[index] = inputValue;
    onChange(field.name, newValue);
  };

  const handleAdd = () => {
    if (field.max && value.length >= field.max) return;
    const newValue = [...value];
    newValue.push("");
    onChange(field.name, newValue);
  };
  const handleRemove = () => {
    let newValue = Array.from({ length: field.min ?? 1 }).map(() => "");
    if (value.length > (field.min ?? 1))
      newValue = value.filter((_, i) => i < value.length - 1);
    onChange(field.name, newValue);
  };

  return (
    <>
      <Typography color={error ? "error" : "inherit"}>
        {field.label ?? capitalizeCamelCase(field.name)}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: field.direction ?? "column" }}>
        {value.map((val, index) => (
          <TextField
            key={index}
            value={val}
            autoFocus={
              !!!autoFocus
                ? false
                : index == 0
                ? autoFocus
                : index === value.length - 1
            }
            fullWidth
            placeholder={
              field.labels
                ? field.labels[index]
                : `${field.label ?? capitalizeCamelCase(field.name)} #${
                    index + 1
                  }`
            }
            onChange={(e) => handleChange(e.target.value, index)}
            error={error !== undefined}
            disabled={disabled}
            type={type ?? "text"}
          />
        ))}
      </Box>
      {!!!field.hideButtons && (
        <Box>
          <IconButton
            onClick={handleAdd}
            disabled={
              disabled || field.max ? value.length >= field.max! : false
            }
          >
            <Add />
          </IconButton>
          <IconButton
            onClick={handleRemove}
            disabled={disabled || value.length <= (field.min ?? 1)}
          >
            <Remove />
          </IconButton>
        </Box>
      )}
      <Typography variant="caption" color="error" sx={{ mt: 1, mb: 2 }}>
        {error}
      </Typography>
    </>
  );
};

export default ArrayInput;
