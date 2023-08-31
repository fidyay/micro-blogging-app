import { Typography } from "@mui/material";
import { ComponentSx } from "@/pages/_app";

type HeadingNumber = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
  children: string;
  variant?: `h${HeadingNumber}`;
  sx?: ComponentSx;
}

function Heading({ children, variant = "h1", sx = {} }: HeadingProps) {
  return (
    <Typography
      sx={{ color: "secondary.contrastText", fontSize: 16, ...sx }}
      variant={variant}
    >
      {children}
    </Typography>
  );
}

export default Heading;
