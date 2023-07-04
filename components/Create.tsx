import React, { useState } from "react";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextInput, { TextInputField } from "components/inputs/TextInput";
import DateTimeInput, {
  DateTimeInputField,
} from "components/inputs/DateTimeInput";
import FileInput, { FileInputField } from "components/inputs/FileInput";

import moment from "moment";
import RadioInput, { RadioInputField } from "components/inputs/RadioInput";
import ArrayInput, { ArrayInputField } from "./inputs/ArrayInput";
import SelectInput, { SelectInputField } from "./inputs/SelectInput";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";

export type InputField =
  | TextInputField
  | DateTimeInputField
  | FileInputField
  | RadioInputField
  | ArrayInputField
  | SelectInputField;

type FieldValue =
  | string
  | moment.Moment
  | FileList
  | string[]
  | null
  | undefined;

export type Fields = {
  [key: string]: FieldValue;
};

export interface SubmitMessage {
  type: AlertColor;
  message: string;
}

interface CreateProps {
  fields: InputField[];
  onSubmit: (fields: Fields) => Promise<SubmitMessage | undefined>;
  isLoading?: boolean;
  children?: JSX.Element;
}

export default function Create(props: CreateProps) {
  const { fields, onSubmit, children, isLoading: isLoadingProps } = props;

  const [states, setStates] = useState<
    { name: string; value: FieldValue; error?: string }[]
  >(
    fields.map((field) => ({
      name: field.name,
      value: {
        text: (field as TextInputField).initialValue ?? "",
        datetime: (field as DateTimeInputField).initialValue ?? null,
        file: null,
        radio: (field as RadioInputField).initialValue,
        array:
          (field as ArrayInputField).initialValue ??
          Array.from({ length: (field as ArrayInputField).min ?? 1 }).map(
            () => ""
          ),
        select: (field as SelectInputField).initialValue ?? "",
      }[field.type],
      error: undefined,
    }))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<SubmitMessage | undefined>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlertMessage(undefined);
    let isError = false;
    let newStates = states;
    setStates((state) => {
      newStates = state.map((val, index) => {
        const error = fields[index].validator
          ? fields[index].validator!(val.value as any)
          : undefined;
        if (error) isError = true;
        return {
          ...val,
          error,
        };
      });
      return newStates;
    });

    if (isError) return;
    setIsLoading(true);
    const response = await onSubmit(
      Object.fromEntries(newStates.map((state) => [state.name, state.value]))
    );
    setIsLoading(false);
    setAlertMessage(response);
  };

  const handleChange = (name: string, value: FieldValue) => {
    setStates((state) => {
      let newState = state;
      newState[state.findIndex((field) => field.name === name)].value = value;

      return [...newState];
    });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertMessage(undefined);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Container maxWidth="xl" sx={{ mb: 4 }}>
        <Snackbar
          open={alertMessage !== undefined}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={alertMessage?.type}
            sx={{ width: "100%" }}
          >
            {alertMessage?.message}
          </Alert>
        </Snackbar>
        {children}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {states.map((state, index) => {
            const field = fields[index];
            const autoFocus = index === 0;

            switch (field.type) {
              case "text":
                return (
                  <TextInput
                    field={field}
                    value={state.value as string}
                    onChange={handleChange}
                    error={state.error}
                    key={field.name}
                    disabled={isLoading || isLoadingProps}
                    autoFocus={autoFocus}
                  />
                );
              case "datetime":
                return (
                  <DateTimeInput
                    field={field}
                    value={state.value as moment.Moment | null}
                    onChange={handleChange}
                    error={state.error}
                    key={field.name}
                    disabled={isLoading || isLoadingProps}
                    autoFocus={autoFocus}
                  />
                );
              case "radio":
                return (
                  <RadioInput
                    field={field}
                    value={state.value as string}
                    onChange={handleChange}
                    error={state.error}
                    key={field.name}
                    disabled={isLoading || isLoadingProps}
                  />
                );
              case "file":
                return (
                  <FileInput
                    field={field}
                    value={state.value as FileList | null}
                    onChange={handleChange}
                    error={state.error}
                    key={field.name}
                    disabled={isLoading || isLoadingProps}
                  />
                );
              case "array":
                return (
                  <ArrayInput
                    field={field}
                    value={state.value as string[]}
                    onChange={handleChange}
                    error={state.error}
                    key={field.name}
                    disabled={isLoading || isLoadingProps}
                    autoFocus={autoFocus}
                  />
                );
              case "select":
                return (
                  <SelectInput
                    field={field}
                    value={state.value as string}
                    onChange={handleChange}
                    error={state.error}
                    key={field.name}
                    disabled={isLoading || isLoadingProps}
                    autoFocus={autoFocus}
                  />
                );
            }
          })}
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading || isLoadingProps}
          >
            Submit
          </Button>
        </form>
      </Container>
    </LocalizationProvider>
  );
}
