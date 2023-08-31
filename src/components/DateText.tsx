import { Typography } from "@mui/material";
import { ComponentSx } from "@/pages/_app";

interface DateTextProps {
  date: string;
  shouldAddSince?: boolean;
  sx?: ComponentSx;
}

function DateText({ date, shouldAddSince = false, sx = {} }: DateTextProps) {
  return (
    <Typography sx={{ fontSize: 12, ...sx }}>
      {shouldAddSince ? "Since " : ""}
      {date}
    </Typography>
  );
}

export default DateText;
