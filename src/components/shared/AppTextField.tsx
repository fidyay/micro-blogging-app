import { TextField } from "@mui/material";
import { ComponentSx } from "@/pages/_app";
import { UseFormRegisterReturn } from "react-hook-form";
import { forwardRef } from "react";

interface AppTextFieldProps {
  label: string;
  multiline?: boolean;
  minRows?: number;
  sx?: ComponentSx;
  required?: boolean;
  type?: "text" | "password" | "email";
  register?: UseFormRegisterReturn<string>;
}

// text field for forms with styling
const AppTextField = forwardRef(function AppTextField(
  {
    label,
    multiline = false,
    minRows = 1,
    sx = {},
    required = false,
    type = "text",
    register,
  }: AppTextFieldProps,
  ref: React.Ref<any>
) {
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
      multiline={multiline}
      minRows={minRows}
      {...register}
    />
  );
});

export default AppTextField;
