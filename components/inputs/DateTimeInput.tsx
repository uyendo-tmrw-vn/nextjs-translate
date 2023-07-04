import moment from "moment";
import DatePicker from "@mui/lab/DatePicker";
import TimePicker from "@mui/lab/TimePicker";
import DateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import capitalizeCamelCase from "utils/capitalizeCamelCase";

export interface DateTimeInputField {
  type: "datetime";
  name: string;
  validator?: (value: moment.Moment | null) => string | undefined;
  label?: string;
  initialValue?: moment.Moment;
  variant?: "date" | "time" | "datetime";
  inputFormat?: string;
}

interface DateTimeInputProps {
  value: moment.Moment | null;
  field: DateTimeInputField;
  onChange: (name: string, value: moment.Moment | null) => void;
  disabled?: boolean;
  error?: string;
  autoFocus?: boolean;
}

const DateTimeInput = (props: DateTimeInputProps) => {
  const { value, field, onChange, disabled, error, autoFocus } = props;
  const handleDateChange = (e: moment.Moment | null) => onChange(field.name, e);

  const renderInput = (params: any) => <TextField {...params} />;
  const renderComponent = () => {
    switch (field.variant) {
      case "date":
        return (
          <DatePicker
            value={value}
            disabled={disabled}
            renderInput={renderInput}
            onChange={handleDateChange}
            InputProps={{ error: error !== undefined }}
            inputFormat={field.inputFormat ?? "DD/MM/yyyy"}
            label={field.label ?? capitalizeCamelCase(field.name)}
            autoFocus={autoFocus}
          />
        );
      case "time":
        return (
          <TimePicker
            value={value}
            disabled={disabled}
            renderInput={renderInput}
            onChange={handleDateChange}
            InputProps={{ error: error !== undefined, autoFocus: autoFocus }}
            inputFormat={field.inputFormat ?? "DD/MM/yyyy"}
            label={field.label ?? capitalizeCamelCase(field.name)}
          />
        );
      case "datetime":
        return (
          <DateTimePicker
            value={value}
            disabled={disabled}
            renderInput={renderInput}
            onChange={handleDateChange}
            InputProps={{ error: error !== undefined }}
            inputFormat={field.inputFormat ?? "DD/MM/yyyy"}
            label={field.label ?? capitalizeCamelCase(field.name)}
            autoFocus={autoFocus}
          />
        );
      default:
        return (
          <DateTimePicker
            value={value}
            disabled={disabled}
            renderInput={renderInput}
            onChange={handleDateChange}
            inputFormat={field.inputFormat ?? "DD/MM/yyyy"}
            label={field.label ?? capitalizeCamelCase(field.name)}
            autoFocus={autoFocus}
          />
        );
    }
  };

  return (
    <>
      {renderComponent()}
      <Typography variant="caption" color="error" sx={{ mt: 1, mb: 2 }}>
        {error}
      </Typography>
    </>
  );
};

export default DateTimeInput;
