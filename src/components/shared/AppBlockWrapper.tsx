import { Paper } from "@mui/material";
import { ComponentSx } from "@/pages/_app";

interface AppBlockWrapperProps {
  children: React.ReactNode;
  sx?: ComponentSx;
}

// styled paper component
function AppBlockWrapper({ children, sx = {} }: AppBlockWrapperProps) {
  return (
    <Paper
      sx={{ bgcolor: "primary.dark", color: "primary.contrastText", ...sx }}
    >
      {children}
    </Paper>
  );
}

export default AppBlockWrapper;
