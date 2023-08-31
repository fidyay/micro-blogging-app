import UserInfo from "./UserInfo";
import { Typography } from "@mui/material";
import AppBlockWrapper from "./AppBlockWrapper";

function Comment() {
  return (
    <AppBlockWrapper>
      <UserInfo />
      <Typography>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      </Typography>
    </AppBlockWrapper>
  );
}

export default Comment;
