import { Button } from "@mui/material";
import { ComponentSx } from "@/pages/_app";

interface AppButtonProps {
  children: React.ReactNode;
  sx?: ComponentSx;
  warning?: boolean;
}

function AppButton({ children, sx = {}, warning = false }: AppButtonProps) {
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

export default AppButton;
