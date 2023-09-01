import { Button } from "@mui/material";
import { ComponentSx } from "@/pages/_app";

interface TextButtonProps {
  children: React.ReactNode;
  sx?: ComponentSx;
  warning?: boolean;
  type?: "submit" | "button";
}

function TextButton({
  children,
  sx = {},
  warning = false,
  type = "button",
}: TextButtonProps) {
  const theme = warning ? "warning" : "secondary";
  return (
    <Button
      type={type}
      sx={{
        fontSize: 12,
        bgcolor: `${theme}.main`,
        color: `${theme}.contrastText`,
        ":hover": {
          bgcolor: `${theme}.dark`,
        },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
}

export default TextButton;
