import Container from "@mui/material/Container";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <Container
      sx={{
        display: "flex",
        bgcolor: "primary.main",
        alignItems: "flex-start",
        py: 1,
      }}
    >
      {children}
    </Container>
  );
}
