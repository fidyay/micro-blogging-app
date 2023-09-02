import { CircularProgress } from "@mui/material";
import { ComponentSx } from "@/pages/_app";

interface AppCircularProgressProps {
  sx?: ComponentSx;
}

export default function AppCircularProgress({
  sx = {},
}: AppCircularProgressProps) {
  return <CircularProgress color="info" sx={sx} />;
}
