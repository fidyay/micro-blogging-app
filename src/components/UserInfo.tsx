import { Box, Typography } from "@mui/material";
import UserAvatar from "./UserAvatar";
import Heading from "./Heading";
import DateText from "./DateText";

function UserInfo() {
  return (
    <Box>
      <UserAvatar>Ex</UserAvatar>
      <Heading>Author</Heading>
      <DateText date="12.12.2012" />
    </Box>
  );
}

export default UserInfo;
