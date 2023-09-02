import { Button } from "@mui/material";
import { ComponentSx } from "@/pages/_app";
import { MouseEventHandler } from "react";

interface TextButtonProps {
  children: React.ReactNode;
  sx?: ComponentSx;
  warning?: boolean;
  type?: "submit" | "button";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function TextButton({
  children,
  sx = {},
  warning = false,
  type = "button",
  onClick,
  disabled = false,
}: TextButtonProps) {
  const theme = warning ? "warning" : "secondary";
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
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
