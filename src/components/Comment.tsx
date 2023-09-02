import UserInfo from "./UserInfo";
import { Typography, Box } from "@mui/material";

function Comment() {
  return (
    <Box
      sx={{
        px: 1,
        py: 0.5,
        "&:hover": {
          bgcolor: "info.light",
        },
      }}
    >
      <UserInfo
        userData={{
          id: "ssdg",
          has_avatar: false,
          since: "12.12.2210",
          name: "Author",
          is_author: true,
        }}
        date="12.12.2210"
        sx={{ pl: 0 }}
      />
      <Typography>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      </Typography>
    </Box>
  );
}

export default Comment;
