import { Paper, Typography, Button, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import UserInfo from "./UserInfo";
import CommentList from "./CommentList";

interface PostProps {
  id: string;
}

function Post({ id }: PostProps) {
  return (
    <Paper>
      <UserInfo />
      <Typography>Title</Typography>
      <Typography>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident
        eveniet reiciendis aperiam impedit! Aut aliquam totam possimus.
        Exercitationem perferendis quia non ipsum similique numquam quae ipsam
        quo, nulla, suscipit officiis!
      </Typography>
      <Box>
        <Box>
          <Button>
            <FavoriteIcon />
          </Button>
        </Box>
        <Box>
          <Button>
            <CommentIcon />
          </Button>
        </Box>
      </Box>
      <CommentList />
    </Paper>
  );
}

export default Post;
