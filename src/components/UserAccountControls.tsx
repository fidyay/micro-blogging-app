import AppBlockWrapper from "./AppBlockWrapper";
import UserAvatar from "./UserAvatar";
import Heading from "./Heading";
import DateText from "./DateText";
import TextButton from "./TextButton";
import { useRouter } from "next/router";
import { SxProps, Theme } from "@mui/material";
import {
  useSupabaseClient,
  SupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { useQueryClient, QueryClient, useQuery } from "react-query";
import ErrorText from "./ErrorText";
import AppCircularProgress from "./AppCircularProgress";

const buttonStyles: SxProps<Theme> = {
  alignSelf: "stretch",
  mb: 1,
};

export type SBClient = SupabaseClient<any, "public", any>;

async function LogOut(supabaseClient: SBClient) {
  const { error } = await supabaseClient.auth.signOut();
  if (error) console.error(error);
}

export interface UserData {
  has_avatar: boolean;
  id: string;
  is_author: boolean;
  name: string;
  since: string;
}

export function useUserInfoQuery(userId: string, supabase: SBClient) {
  const key = ["users", userId];

  return useQuery(key, async () => {
    const r = await supabase.from("users").select("*").eq("id", userId);
    if (r.data) return r.data[0] as UserData;
    return;
  });
}

export const avatarsUrl = `${
  process.env.NEXT_PUBLIC_SUPABASE_URL as string
}/storage/v1/object/public/images/avatars/`;

export default function UserAccountControls() {
  const router = useRouter();
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useUserInfoQuery(
    user?.id as string,
    supabaseClient
  );
  if (isLoading) {
    return (
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
        <AppCircularProgress />
      </AppBlockWrapper>
    );
  }
  if (isError) {
    return (
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
    );
  }
  return (
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
      {user ? (
        <>
          {" "}
          {data?.has_avatar ? (
            <UserAvatar src={avatarsUrl + data.id} alt={data.name} size={50} />
          ) : (
            <UserAvatar sx={{ mb: 1 }} size={50}>
              {data?.name as string}
            </UserAvatar>
          )}
          <Heading sx={{ mt: 1 }}>{data?.name as string}</Heading>
          <DateText
            sx={{ mb: 1 }}
            date={data?.since as string}
            shouldAddSince
          />
          <TextButton
            onClick={() => LogOut(supabaseClient)}
            sx={{ ...buttonStyles, mb: 0 }}
          >
            Logout
          </TextButton>{" "}
        </>
      ) : (
        <>
          <TextButton onClick={() => router.push("/sign-up")} sx={buttonStyles}>
            Sign up
          </TextButton>
          <TextButton
            onClick={() => router.push("/login")}
            sx={{ ...buttonStyles, mb: 0 }}
          >
            Log in
          </TextButton>
        </>
      )}
    </AppBlockWrapper>
  );
}
