import { Typography } from "@mui/material";
import { ComponentSx } from "@/pages/_app";

interface ErrorTextProps {
  sx?: ComponentSx;
}

// text to show that something went wrong for the user
function ErrorText({ sx = {} }: ErrorTextProps) {
  return (
    <Typography sx={{ color: "warning.main", ...sx }}>
      Some error occured :(
    </Typography>
  );
}

export default ErrorText;
