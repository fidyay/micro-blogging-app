import { Typography, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import UserInfo from "./UserInfo";
import CommentList from "./CommentList";
import AppBlockWrapper from "./AppBlockWrapper";
import Heading from "./Heading";
import Image from "mui-image";
import { IconButton } from "@mui/material";
import { ComponentSx } from "@/pages/_app";
import { useState } from "react";
import { UserData } from "./UserAccountControls";
import AppCircularProgress from "./AppCircularProgress";

export interface PostData {
  id: string;
  title: string;
  description: string;
  created_at: string;
  author: UserData;
  has_image: boolean;
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
  comments_number,
}: PostProps) {
  const [commentListExpanded, setCommentListExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  return (
    <AppBlockWrapper sx={{ mb: 1, py: 1 }}>
      <UserInfo userData={author} date={created_at} sx={{ mx: 1, pl: 0 }} />
      <Heading sx={{ mx: 1, mt: 1 }}>{title}</Heading>
      <Typography sx={{ mx: 1 }}>{description}</Typography>
      {has_image ? (
        <Image
          style={{ marginLeft: "0px", marginTop: "10px", marginBottom: "10px" }}
          src={postImageUrl + id}
          alt={title}
        />
      ) : null}
      <Box sx={{ ...buttonWrapperStyle, ml: 1 }}>
        <IconButton
          onClick={() => setCommentListExpanded(!commentListExpanded)}
          color="info"
        >
          <CommentIcon />
        </IconButton>
        <Typography>{comments_number}</Typography>
      </Box>

      <CommentList
        commentsNumber={comments_number}
        postId={id}
        expanded={commentListExpanded}
      />
    </AppBlockWrapper>
  );
}

export default Post;
