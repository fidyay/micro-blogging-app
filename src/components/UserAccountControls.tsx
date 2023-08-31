import AppBlockWrapper from "./AppBlockWrapper";
import UserAvatar from "./UserAvatar";
import Heading from "./Heading";
import DateText from "./DateText";
import AppButton from "./AppButton";
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
      <AppButton sx={buttonStyles}>Edit account</AppButton>
      <AppButton sx={buttonStyles}>Logout</AppButton>
      <AppButton warning sx={{ ...buttonStyles, mb: 0 }}>
        Delete account
      </AppButton>
    </AppBlockWrapper>
  );
}
