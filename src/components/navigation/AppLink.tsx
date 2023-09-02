import Link from "next/link";
import UserInfo from "../shared/UserInfo";
import Heading from "../shared/Heading";
import { useRouter } from "next/router";
import { UserData } from "../account/UserAccountControls";

interface AppLinkProps {
  id: string;
  authorData?: UserData;
}

function AppLink({ id, authorData }: AppLinkProps) {
  const router = useRouter();
  if (id === "general") {
    return (
      <Link
        className={
          (router.pathname === "/feed/general" ? "chosen" : "") +
          " link_general"
        }
        href="/feed/general"
      >
        <Heading
          sx={{
            width: "115px",
            height: "42px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          General
        </Heading>
      </Link>
    );
  } else {
    const ad = authorData as UserData;
    return (
      <Link
        className={
          (router.asPath === `/feed/author/${id}` ? "chosen" : "") +
          " link_author"
        }
        href={`/feed/author/${id}`}
      >
        <UserInfo
          userData={{
            id: ad.id,
            has_avatar: ad.has_avatar,
            since: ad.since,
            name: ad.name,
            is_author: true,
          }}
          date={ad.since}
        />
      </Link>
    );
  }
}

export default AppLink;
