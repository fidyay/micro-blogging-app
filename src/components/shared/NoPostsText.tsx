import { Typography } from "@mui/material";
import AppBlockWrapper from "./AppBlockWrapper";

export default function NoPostsText() {
  return (
    <AppBlockWrapper sx={{ p: 1 }}>
      <Typography>There are no posts</Typography>
    </AppBlockWrapper>
  );
}
