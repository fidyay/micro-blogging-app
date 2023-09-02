import RootLayout from "@/components/shared/RootLayout";
import UserAccount from "@/components/account/UserAccountControls";
import PostList from "@/components/posts/PostList";
import Navigation from "@/components/navigation/Navigation";

export default function GeneralPage() {
  return (
    <RootLayout>
      <UserAccount />
      <PostList authorId="general" />
      <Navigation />
    </RootLayout>
  );
}
