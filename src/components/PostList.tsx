import { Box } from "@mui/material";
import Post from "./Post";

function PostList() {
  return (
    <Box>
      {[1, 2, 3].map((item, index) => (
        <Post id={String(item)} key={item} />
      ))}
    </Box>
  );
}

export default PostList;
