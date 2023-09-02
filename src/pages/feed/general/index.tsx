import RootLayout from "@/components/RootLayout";
import UserAccount from "@/components/UserAccountControls";
import PostList from "@/components/PostList";
import Navigation from "@/components/Navigation";

export default function GeneralPage() {
  return (
    <RootLayout>
      <UserAccount />
      <PostList authorId="general" />
      <Navigation />
    </RootLayout>
  );
}
