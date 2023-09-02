import UserInfo from "./UserInfo";
import { Typography, Box } from "@mui/material";
import { UserData } from "./UserAccountControls";

export interface CommentData {
  commentator: UserData;
  created_at: string;
  id: string;
  text: string;
  post_id: string;
}

function Comment({ commentator, created_at, id, text, post_id }: CommentData) {
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
      <UserInfo userData={commentator} date={created_at} sx={{ pl: 0 }} />
      <Typography>{text}</Typography>
    </Box>
  );
}

export default Comment;
