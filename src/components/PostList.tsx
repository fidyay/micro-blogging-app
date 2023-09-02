import { Box } from "@mui/material";
import Post from "./Post";
import PostCreationForm from "./PostCreationForm";
import { useUserInfoQuery } from "./UserAccountControls";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import ErrorText from "./ErrorText";
import AppBlockWrapper from "./AppBlockWrapper";

function PostList() {
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
  return (
    <Box>
      {userInfoError ? (
        <AppBlockWrapper sx={{ mb: 1, p: 1 }}>
          <ErrorText />
        </AppBlockWrapper>
      ) : null}
      {shouldPostCreationFormRender ? <PostCreationForm /> : null}
      {[1, 2, 3].map((item, index) => (
        <Post id={String(item)} key={item} />
      ))}
    </Box>
  );
}

export default PostList;
