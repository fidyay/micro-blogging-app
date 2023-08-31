import { TextField } from "@mui/material";
import { ComponentSx } from "@/pages/_app";

interface AppTextFieldProps {
  label: string;
  multiline?: boolean;
  minRows?: number;
  sx?: ComponentSx;
  required?: boolean;
  type?: "text" | "password" | "email";
}

function AppTextField({
  label,
  multiline = false,
  minRows = 1,
  sx = {},
  required = false,
  type = "text",
}: AppTextFieldProps) {
  return (
    <TextField
      type={type}
      sx={{
        ...sx,
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
      multiline={multiline}
      minRows={minRows}
    />
  );
}

export default AppTextField;
