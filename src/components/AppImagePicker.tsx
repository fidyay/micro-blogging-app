import { MuiFileInput } from "mui-file-input";
import { ComponentSx } from "@/pages/_app";

interface AppImagePickerProps {
  label: string;
  sx?: ComponentSx;
  required?: boolean;
  onChange: (newValue: File | null) => void;
  value: File | null;
}

function AppImagePicker({
  label,
  sx = {},
  required = false,
  value,
  onChange,
}: AppImagePickerProps) {
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
      name={label.toLowerCase()}
      value={value}
      onChange={onChange}
      hideSizeText
      inputProps={{ accept: "image/*" }}
    />
  );
}

export default AppImagePicker;
