import { Typography, Box } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import UserInfo from "../shared/UserInfo";
import CommentList from "../comments/CommentList";
import AppBlockWrapper from "../shared/AppBlockWrapper";
import Heading from "../shared/Heading";
import Image from "mui-image";
import { IconButton } from "@mui/material";
import { ComponentSx } from "@/pages/_app";
import { useState } from "react";
import { UserData } from "../account/UserAccountControls";
import DeleteButton from "../shared/DeleteButton";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQueryClient, useMutation } from "react-query";

export interface PostData {
  id: string;
  title: string;
  description: string;
  created_at: string;
  author: UserData;
  has_image: boolean;
  comments_number: number;
}

// mutation to delete post from db, also deletes comments of a post to be deleted
function useDeletePostMutation(post_id: string, has_image: boolean) {
  const supabaseClient = useSupabaseClient();
  const queryClient = useQueryClient();
  async function deletePost() {
    if (has_image) {
      const { data, error } = await supabaseClient.storage
        .from("images")
        .remove([`post_pictures/${post_id}`]);
      if (error) console.error(error);
    }
    const { error: commentError } = await supabaseClient
      .from("comments")
      .delete()
      .eq("post_id", post_id);
    if (commentError) console.error(commentError);
    const { error: postError } = await supabaseClient
      .from("posts")
      .delete()
      .eq("id", post_id);

    if (postError) console.error(postError);
  }
  return useMutation(async () => deletePost(), {
    onError: console.error,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
}

const buttonWrapperStyle: ComponentSx = {
  display: "flex",
  alignItems: "center",
};

// link to post images on bucket
const postImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/post_pictures/`;

function Post({
  id,
  title,
  description,
  created_at,
  author,
  has_image,
  comments_number,
}: PostData) {
  const [commentListExpanded, setCommentListExpanded] = useState(false);
  const user = useUser();
  const deleltePostMutation = useDeletePostMutation(id, has_image);
  return (
    <AppBlockWrapper sx={{ mb: 1, py: 1, position: "relative" }}>
      {user?.id === author.id ? (
        <DeleteButton onClick={deleltePostMutation.mutate} />
      ) : null}
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
