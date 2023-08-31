import RootLayout from "@/components/RootLayout";
import UserAccount from "@/components/UserAccountControls";
import PostList from "@/components/PostList";

export default function GeneralPage() {
  return (
    <RootLayout>
      <UserAccount />
      <PostList />
    </RootLayout>
  );
}
