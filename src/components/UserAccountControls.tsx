import AppBlockWrapper from "./AppBlockWrapper";
import UserAvatar from "./UserAvatar";
import Heading from "./Heading";
import DateText from "./DateText";
import TextButton from "./TextButton";
import { SxProps, Theme } from "@mui/material";

const buttonStyles: SxProps<Theme> = {
  alignSelf: "stretch",
  mb: 1,
};

export default function UserAccount() {
  return (
    <AppBlockWrapper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexShrink: 0,
        p: 1,
        mr: 1,
      }}
    >
      <UserAvatar sx={{ mb: 1 }} size={40}>
        Ex
      </UserAvatar>
      <Heading>Name Surname</Heading>
      <DateText sx={{ mb: 1 }} date="12.12.2012" shouldAddSince />
      <TextButton sx={buttonStyles}>Edit account</TextButton>
      <TextButton sx={buttonStyles}>Logout</TextButton>
      <TextButton warning sx={{ ...buttonStyles, mb: 0 }}>
        Delete account
      </TextButton>
    </AppBlockWrapper>
  );
}
