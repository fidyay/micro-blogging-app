import UserInfo from "./UserInfo";
import { Typography, Box } from "@mui/material";
import { UserData } from "./UserAccountControls";
import DeleteButton from "./DeleteButton";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQueryClient, useMutation } from "react-query";

export interface CommentData {
  commentator: UserData;
  created_at: string;
  id: string;
  text: string;
  post_id: string;
}

function useDeleteCommentMutation(
  id: string,
  comment_number: number,
  post_id: string
) {
  const supabaseClient = useSupabaseClient();
  const queryClient = useQueryClient();
  async function delelteComment() {
    const { error } = await supabaseClient
      .from("comments")
      .delete()
      .eq("id", id);

    if (error) console.error(error);

    const { data: postData, error: postError } = await supabaseClient
      .from("posts")
      .update({ comments_number: comment_number - 1 })
      .eq("id", post_id);
    if (postError) console.error(postError);
  }
  return useMutation(async () => delelteComment(), {
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

interface CommentProps extends CommentData {
  comment_number: number;
}

function Comment({
  commentator,
  created_at,
  id,
  text,
  post_id,
  comment_number,
}: CommentProps) {
  const user = useUser();
  const deleteCommentMutation = useDeleteCommentMutation(
    id,
    comment_number,
    post_id
  );
  return (
    <Box
      sx={{
        position: "relative",
        px: 1,
        py: 0.5,
        "&:hover": {
          bgcolor: "info.light",
        },
      }}
    >
      <UserInfo userData={commentator} date={created_at} sx={{ pl: 0 }} />
      <Typography>{text}</Typography>
      {user?.id === commentator.id ? (
        <DeleteButton onClick={deleteCommentMutation.mutate} />
      ) : null}
    </Box>
  );
}

export default Comment;
