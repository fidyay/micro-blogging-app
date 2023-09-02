import { Box } from "@mui/material";
import UserAvatar from "./UserAvatar";
import Heading from "./Heading";
import DateText from "./DateText";
import { ComponentSx } from "@/pages/_app";
import { UserData, avatarsUrl } from "../account/UserAccountControls";

interface UserInfoProps {
  sx?: ComponentSx;
  date: string;
  userData: UserData;
  avatarSize?: number;
}

function UserInfo({ sx = {}, date, userData, avatarSize = 35 }: UserInfoProps) {
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
      {userData.has_avatar ? (
        <UserAvatar
          size={avatarSize}
          alt={userData.name}
          src={avatarsUrl + userData.id}
        />
      ) : (
        <UserAvatar size={avatarSize} sx={{ mr: 1 }}>
          {userData.name}
        </UserAvatar>
      )}
      <Box sx={{ ml: 1 }}>
        <Heading sx={{ fontSize: 14 }}>{userData.name}</Heading>
        <DateText sx={{ fontSize: 12 }} date={date} />
      </Box>
    </Box>
  );
}

export default UserInfo;
