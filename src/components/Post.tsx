import { Typography, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import UserInfo from "./UserInfo";
import CommentList from "./CommentList";
import AppBlockWrapper from "./AppBlockWrapper";
import Heading from "./Heading";
import Image from "next/image";
import { IconButton } from "@mui/material";
import { ComponentSx } from "@/pages/_app";
import { useState } from "react";
interface PostProps {
  id: string;
}

const buttonWrapperStyle: ComponentSx = {
  display: "flex",
  alignItems: "center",
};

function Post({ id }: PostProps) {
  const [commentListExpanded, setCommentListExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  return (
    <AppBlockWrapper sx={{ mb: 1, py: 1 }}>
      <UserInfo sx={{ mx: 1, pl: 0 }} />
      <Heading sx={{ mx: 1, mt: 1 }}>Title</Heading>
      <Typography sx={{ mx: 1 }}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident
        eveniet reiciendis aperiam impedit! Aut aliquam totam possimus.
        Exercitationem perferendis quia non ipsum similique numquam quae ipsam
        quo, nulla, suscipit officiis!
      </Typography>
      <Image src="/vercel.svg" alt="img" width={150} height={150} />
      <Box sx={{ display: "flex", mx: 1 }}>
        <Box sx={buttonWrapperStyle}>
          <IconButton onClick={() => setLiked(!liked)} color="warning">
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography>124</Typography>
        </Box>
        <Box sx={{ ...buttonWrapperStyle, ml: 1 }}>
          <IconButton
            onClick={() => setCommentListExpanded(!commentListExpanded)}
            color="info"
          >
            <CommentIcon />
          </IconButton>
          <Typography>124</Typography>
        </Box>
      </Box>

      <CommentList expanded={commentListExpanded} />
    </AppBlockWrapper>
  );
}

export default Post;
