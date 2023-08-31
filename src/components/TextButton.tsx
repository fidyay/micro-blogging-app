import { Button } from "@mui/material";
import { ComponentSx } from "@/pages/_app";

interface TextButtonProps {
  children: React.ReactNode;
  sx?: ComponentSx;
  warning?: boolean;
}

function TextButton({ children, sx = {}, warning = false }: TextButtonProps) {
  const theme = warning ? "warning" : "secondary";
  return (
    <Button
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
