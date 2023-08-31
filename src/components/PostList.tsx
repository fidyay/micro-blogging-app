import { Box } from "@mui/material";
import Post from "./Post";
import PostCreationForm from "./PostCreationForm";

function PostList() {
  return (
    <Box>
      <PostCreationForm />
      {[1, 2, 3].map((item, index) => (
        <Post id={String(item)} key={item} />
      ))}
    </Box>
  );
}

export default PostList;
