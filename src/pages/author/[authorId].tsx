import { useRouter } from "next/router";
import RootLayout from "@/components/shared/RootLayout";
import UserAccount from "@/components/account/UserAccountControls";
import PostList from "@/components/posts/PostList";
import Navigation from "@/components/navigation/Navigation";

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
