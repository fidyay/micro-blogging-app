import { MuiFileInput } from "mui-file-input";
import { ComponentSx } from "@/pages/_app";
import { forwardRef } from "react";

interface AppImagePickerProps {
  label: string;
  sx?: ComponentSx;
  required?: boolean;
  onChange: (...event: any[]) => void;
  value: File | null;
  name: string;
  helperText: string;
  onBlur: (...event: any[]) => void;
  error: boolean;
}

const AppImagePicker = forwardRef(function AppImagePicker(
  {
    label,
    sx = {},
    required = false,
    value,
    onChange,
    onBlur,
    name,
    helperText,
    error,
  }: AppImagePickerProps,
  ref: React.Ref<any>
) {
  return (
    <MuiFileInput
      sx={{
        ...sx,
        "& svg": {
          stroke: "#a3a3af",
          fill: "#a3a3af",
        },
        "&:hover svg": {
          stroke: "#e7f6f9",
          fill: "#e7f6f9",
        },
        "& .MuiInputBase-root.Mui-focused svg": {
          stroke: "#116dfe",
          fill: "#116dfe",
        },
        "&:hover .MuiFormLabel-root": {
          color: "secondary.contrastText",
        },
        "&:hover .MuiFormLabel-root.Mui-focused": {
          color: "secondary.main",
        },
        "& .MuiOutlinedInput-root": {
          "& > fieldset": { borderColor: "primary.contrastText" },
        },
        "& .MuiOutlinedInput-root.Mui-focused:hover": {
          "& > fieldset": {
            borderColor: "secondary.main",
          },
        },
        "& .MuiOutlinedInput-root:hover": {
          "& > fieldset": {
            borderColor: "secondary.contrastText",
          },
        },
      }}
      InputProps={{
        sx: {
          color: "secondary.contrastText",
        },
      }}
      InputLabelProps={{
        sx: {
          color: "primary.contrastText",
        },
      }}
      color="secondary"
      required={required}
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      helperText={helperText}
      onBlur={onBlur}
      hideSizeText
      error={error}
      inputProps={{ accept: "image/*" }}
      ref={ref}
    />
  );
});

export default AppImagePicker;
