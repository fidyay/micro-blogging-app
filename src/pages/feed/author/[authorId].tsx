import { useRouter } from "next/router";
import RootLayout from "@/components/RootLayout";
import UserAccount from "@/components/UserAccountControls";
import PostList from "@/components/PostList";
import Navigation from "@/components/Navigation";

export default function GeneralPage() {
  const router = useRouter();
  const authorId = router.query.authorId;
  return (
    <RootLayout>
      <UserAccount />
      <PostList authorId={authorId as string} />
      <Navigation />
    </RootLayout>
  );
}
