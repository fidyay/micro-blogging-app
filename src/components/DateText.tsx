import { Typography } from "@mui/material";
import { ComponentSx } from "@/pages/_app";
import moment from "moment";

interface DateTextProps {
  date: string;
  shouldAddSince?: boolean;
  sx?: ComponentSx;
}

function DateText({ date, shouldAddSince = false, sx = {} }: DateTextProps) {
  return (
    <Typography sx={{ fontSize: 12, ...sx }}>
      {shouldAddSince ? "since " : ""}
      {moment(date).format("ll")}
    </Typography>
  );
}

export default DateText;
