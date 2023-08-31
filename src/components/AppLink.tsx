import Link from "next/link";
import UserInfo from "./UserInfo";
import Heading from "./Heading";
import { useRouter } from "next/router";

interface AppLinkProps {
  id: string;
  chosen?: boolean;
}

function AppLink({ id, chosen = false }: AppLinkProps) {
  const router = useRouter();
  if (id === "general") {
    return (
      <Link
        className={router.pathname === "/general" ? "chosen" : ""}
        href="/general"
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
    return (
      <Link
        className={router.pathname === `/author/${id}` ? "chosen" : ""}
        href={`/author/${id}`}
      >
        <UserInfo />
      </Link>
    );
  }
}

export default AppLink;
