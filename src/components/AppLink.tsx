import Link from "next/link";
import { Divider, Typography } from "@mui/material";
import UserInfo from "./UserInfo";

interface AppLinkProps {
  id: string;
}

function AppLink({ id }: AppLinkProps) {
  if (id === "general") {
    return (
      <>
        <Link href="/general">
          <Typography>General</Typography>
        </Link>
        <Divider />
      </>
    );
  } else {
    return (
      <Link href={`author/${id}`}>
        <UserInfo />
      </Link>
    );
  }
}

export default AppLink;
