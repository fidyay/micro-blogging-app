import Container from "@mui/material/Container";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return <Container>{children}</Container>;
}
