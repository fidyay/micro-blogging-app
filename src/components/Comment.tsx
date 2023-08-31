import UserInfo from "./UserInfo";
import { Paper, Typography } from "@mui/material";

function Comment() {
  return (
    <Paper>
      <UserInfo />
      <Typography>Title</Typography>
      <Typography>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      </Typography>
    </Paper>
  );
}

export default Comment;
