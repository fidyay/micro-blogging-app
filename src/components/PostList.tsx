import { Box } from "@mui/material";
import Post from "./Post";
import PostCreationForm from "./PostCreationForm";
import { useUserInfoQuery } from "./UserAccountControls";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import ErrorText from "./ErrorText";
import AppBlockWrapper from "./AppBlockWrapper";
import { SBClient } from "./UserAccountControls";
import { useQuery } from "react-query";
import { PostData } from "./Post";
import { UserData } from "./UserAccountControls";
import AppCircularProgress from "./AppCircularProgress";
import NoPostsText from "./NoPostsText";

function usePostsQuery(pageAuthorId: string, supabase: SBClient) {
  const key = ["posts", pageAuthorId];

  return useQuery(key, async () => {
    let r: PostgrestSingleResponse<any[]>;
    if (pageAuthorId === "general") {
      r = await supabase.from("posts").select("*");
    } else {
      r = await supabase
        .from("posts")
        .select("*")
        .eq("author_id", pageAuthorId);
    }
    if (r.data) {
      const resolvedPostsData = await Promise.all(
        r.data.map(async (pd) => {
          const authorR = await supabase
            .from("users")
            .select("*")
            .eq("id", pd.author_id);
          let authorData: UserData;
          if (authorR.data) {
            const authorDbData = authorR.data[0] as UserData;
            authorData = {
              has_avatar: authorDbData.has_avatar,
              id: authorDbData.id,
              is_author: authorDbData.is_author,
              name: authorDbData.name,
              since: authorDbData.since,
            };
          } else {
            authorData = {
              has_avatar: false,
              id: "uknown",
              is_author: true,
              name: "Unknown",
              since: Date.now().toString(),
            };
          }
          const postData: PostData = {
            id: pd.id,
            title: pd.title,
            description: pd.description,
            created_at: pd.created_at,
            author: authorData,
            has_image: pd.has_image,
            comments_number: pd.comments_number,
          };
          return postData;
        })
      );
      return resolvedPostsData.sort((a, b) => {
        return (
          new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
        );
      });
    }

    return;
  });
}

interface PostListProps {
  authorId: string;
}

function PostList({ authorId }: PostListProps) {
  const router = useRouter();
  const user = useUser();
  const supabase = useSupabaseClient();
  const { data: userInfoData, isError: userInfoError } = useUserInfoQuery(
    user?.id as string,
    supabase
  );
  const shouldPostCreationFormRender = !!(
    router.pathname.includes("general") && userInfoData?.is_author
  );

  const { data, isLoading, isError } = usePostsQuery(authorId, supabase);

  return (
    <Box
      sx={{
        mt: {
          xs: 1,
          sm: 0,
        },
        flexGrow: 1,
        order: {
          xs: 3,
          sm: 2,
        },
      }}
    >
      {userInfoError ? (
        <AppBlockWrapper sx={{ mb: 1, p: 1 }}>
          <ErrorText />
        </AppBlockWrapper>
      ) : null}

      {shouldPostCreationFormRender ? <PostCreationForm /> : null}
      {isLoading ? (
        <AppBlockWrapper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexShrink: 0,
            p: 1,
          }}
        >
          <AppCircularProgress />
        </AppBlockWrapper>
      ) : null}
      {isError ? (
        <AppBlockWrapper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexShrink: 0,
            p: 1,
            mr: 1,
          }}
        >
          <ErrorText />
        </AppBlockWrapper>
      ) : null}
      {data ? (
        data.length ? (
          data.map((post) => {
            return <Post key={post.id} {...post} />;
          })
        ) : (
          <NoPostsText />
        )
      ) : null}
    </Box>
  );
}

export default PostList;
