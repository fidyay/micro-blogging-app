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
      <UserInfo sx={{ pl: 0 }} />
      <Typography>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      </Typography>
    </Box>
  );
}

export default Comment;
