import Comment from "./Comment";
import Heading from "./Heading";
import { Accordion, Divider } from "@mui/material";
import LeaveCommentForm from "./LeaveCommentForm";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useUserInfoQuery } from "./UserAccountControls";
import { UserData } from "./UserAccountControls";
import { CommentData } from "./Comment";
import { useQuery } from "react-query";
import NoCommentsText from "./NoCommentsText";
import AppCircularProgress from "./AppCircularProgress";
import ErrorText from "./ErrorText";

function useCommentsQuery(postId: string) {
  const key = ["comments", postId];
  const supabase = useSupabaseClient();

  return useQuery(key, async () => {
    let { data: comments, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId);
    if (comments) {
      const resolvedCommentData = await Promise.all(
        comments.map(async (c) => {
          const commentatorR = await supabase
            .from("users")
            .select("*")
            .eq("id", c.commentator_id);
          let commentatorData: UserData;
          if (commentatorR.data) {
            const commentatorDbData = commentatorR.data[0] as UserData;
            commentatorData = {
              has_avatar: commentatorDbData.has_avatar,
              id: commentatorDbData.id,
              is_author: commentatorDbData.is_author,
              name: commentatorDbData.name,
              since: commentatorDbData.since,
            };
          } else {
            commentatorData = {
              has_avatar: false,
              id: "uknown",
              is_author: true,
              name: "Unknown",
              since: Date.now().toString(),
            };
          }
          const commentData: CommentData = {
            id: c.id,
            text: c.text,
            commentator: commentatorData,
            post_id: c.post_id,
            created_at: c.created_at,
          };
          return commentData;
        })
      );
      return resolvedCommentData.sort((a, b) => {
        return (
          new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
        );
      });
    }

    return;
  });
}

interface CommentListProps {
  expanded?: boolean;
  postId: string;
  commentsNumber: number;
}

function CommentList({
  expanded = false,
  postId,
  commentsNumber,
}: CommentListProps) {
  const router = useRouter();
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const { data, isLoading, isError } = useUserInfoQuery(
    user?.id as string,
    supabaseClient
  );
  const shouldRenderLeaveCommentForm =
    data && !data.is_author && router.pathname.includes("author");

  const {
    data: commentsData,
    isLoading: areCommentsLoading,
    isError: isCommentsError,
  } = useCommentsQuery(postId);

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
        <LeaveCommentForm commentsNumber={commentsNumber} postId={postId} />
      ) : null}
      <Heading sx={{ m: 1 }}>Comments</Heading>
      {areCommentsLoading ? <AppCircularProgress sx={{ ml: 1 }} /> : null}
      {isCommentsError ? <ErrorText sx={{ ml: 1 }} /> : null}
      {commentsData ? (
        commentsData.length ? (
          commentsData.map((comment) => {
            return (
              <Comment
                key={comment.id}
                {...comment}
                comment_number={commentsNumber}
              />
            );
          })
        ) : (
          <NoCommentsText />
        )
      ) : null}
    </Accordion>
  );
}

export default CommentList;
