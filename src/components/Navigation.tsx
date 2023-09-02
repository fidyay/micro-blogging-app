import AppLink from "./AppLink";
import AppBlockWrapper from "./AppBlockWrapper";
import Heading from "./Heading";
import { Divider } from "@mui/material";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { UserData } from "./UserAccountControls";
import { useQuery } from "react-query";
import ErrorText from "./ErrorText";
import AppCircularProgress from "./AppCircularProgress";
import NoAuthorsText from "./NoAuthorsText";

function useAuthorsQuery() {
  const key = ["users", "authors"];
  const supabase = useSupabaseClient();
  return useQuery(key, async () => {
    const r = await supabase.from("users").select("*").eq("is_author", true);
    if (r.data) return r.data as UserData[];
    return;
  });
}

function Navigation() {
  const { data, isLoading, isError } = useAuthorsQuery();
  if (isLoading) {
    return (
      <AppBlockWrapper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          p: 1,
          ml: 1,
          order: {
            xs: 2,
            sm: 3,
          },
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
          ml: 1,
          order: {
            xs: 2,
            sm: 3,
          },
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
        py: 1,
        ml: 1,
        order: {
          xs: 2,
          sm: 3,
        },
      }}
    >
      <Heading sx={{ mb: 1 }}>Pages</Heading>
      <AppLink id="general" />
      <Divider sx={{ bgcolor: "primary.contrastText", width: "100%" }} />
      {data ? (
        data.length ? (
          data.map((a) => <AppLink key={a.id} authorData={a} id={a.id} />)
        ) : (
          <NoAuthorsText />
        )
      ) : null}
    </AppBlockWrapper>
  );
}

export default Navigation;
