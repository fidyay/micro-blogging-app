import { Box } from "@mui/material";
import UserAvatar from "./UserAvatar";
import Heading from "./Heading";
import DateText from "./DateText";
import { ComponentSx } from "@/pages/_app";

interface UserInfoProps {
  sx?: ComponentSx;
}

function UserInfo({ sx = {} }: UserInfoProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        px: 1,
        py: 0.5,
        ...sx,
      }}
    >
      <UserAvatar sx={{ mr: 1 }}>Ex</UserAvatar>
      <Box>
        <Heading sx={{ fontSize: 14 }}>Author</Heading>
        <DateText sx={{ fontSize: 12 }} date="12.12.2012" />
      </Box>
    </Box>
  );
}

export default UserInfo;
