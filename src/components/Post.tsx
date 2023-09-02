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
import { UserData } from "./UserAccountControls";

export interface PostData {
  id: string;
  title: string;
  description: string;
  created_at: string;
  author: UserData;
  has_image: boolean;
  likes_number: number;
  comments_number: number;
}

interface PostProps extends PostData {}

const buttonWrapperStyle: ComponentSx = {
  display: "flex",
  alignItems: "center",
};

const postImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/post_pictures/`;

function Post({
  id,
  title,
  description,
  created_at,
  author,
  has_image,
  likes_number,
  comments_number,
}: PostProps) {
  const [commentListExpanded, setCommentListExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  return (
    <AppBlockWrapper sx={{ mb: 1, py: 1 }}>
      <UserInfo userData={author} date={created_at} sx={{ mx: 1, pl: 0 }} />
      <Heading sx={{ mx: 1, mt: 1 }}>{title}</Heading>
      <Typography sx={{ mx: 1 }}>{description}</Typography>
      {/* {has_image ? (
        <Image src={postImageUrl + id} alt={title} width={150} height={150} />
      ) : null} */}
      <Box sx={{ display: "flex", mx: 1 }}>
        <Box sx={buttonWrapperStyle}>
          <IconButton onClick={() => setLiked(!liked)} color="warning">
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography>{likes_number}</Typography>
        </Box>
        <Box sx={{ ...buttonWrapperStyle, ml: 1 }}>
          <IconButton
            onClick={() => setCommentListExpanded(!commentListExpanded)}
            color="info"
          >
            <CommentIcon />
          </IconButton>
          <Typography>{comments_number}</Typography>
        </Box>
      </Box>

      <CommentList expanded={commentListExpanded} />
    </AppBlockWrapper>
  );
}

export default Post;
