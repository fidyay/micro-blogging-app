import Comment from "./Comment";
import { Box } from "@mui/material";

function CommentList() {
  return (
    <Box>
      {[1, 2, 3].map((comment, index) => (
        <Comment key={index} />
      ))}
    </Box>
  );
}

export default CommentList;
