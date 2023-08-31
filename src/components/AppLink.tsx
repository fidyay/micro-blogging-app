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
      <Link href="/general">
        <Heading
          sx={{
            width: "115px",
            height: "42px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: router.pathname === "/general" ? "info.main" : "",
          }}
        >
          General
        </Heading>
      </Link>
    );
  } else {
    return (
      <Link href={`/author/${id}`}>
        <UserInfo chosen={router.pathname === `/author/${id}`} />
      </Link>
    );
  }
}

export default AppLink;
