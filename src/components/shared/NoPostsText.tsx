import { Typography } from "@mui/material";
import AppBlockWrapper from "./AppBlockWrapper";

// text to show that there are not posts on page

export default function NoPostsText() {
  return (
    <AppBlockWrapper sx={{ p: 1 }}>
      <Typography>There are no posts</Typography>
    </AppBlockWrapper>
  );
}
