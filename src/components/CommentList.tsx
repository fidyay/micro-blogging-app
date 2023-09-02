import Comment from "./Comment";
import Heading from "./Heading";
import { Accordion, Divider } from "@mui/material";
import LeaveCommentForm from "./LeaveCommentForm";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useUserInfoQuery } from "./UserAccountControls";

interface CommentListProps {
  expanded?: boolean;
  postId: string;
}

function CommentList({ expanded = false, postId }: CommentListProps) {
  const router = useRouter();
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const { data, isLoading, isError } = useUserInfoQuery(
    user?.id as string,
    supabaseClient
  );
  const shouldRenderLeaveCommentForm =
    data && !data.is_author && router.pathname.includes("author");
  return (
    <Accordion
      sx={{
        bgcolor: "primary.dark",
        color: "primary.contrastText",
        border: "none !important",
      }}
      expanded={expanded}
      elevation={0}
    >
      <Divider sx={{ bgcolor: "primary.contrastText" }} />
      {shouldRenderLeaveCommentForm ? (
        <LeaveCommentForm postId={postId} />
      ) : null}
      <Heading sx={{ m: 1 }}>Comments</Heading>
      {[1, 2, 3].map((comment, index) => (
        <Comment key={index} />
      ))}
    </Accordion>
  );
}

export default CommentList;
