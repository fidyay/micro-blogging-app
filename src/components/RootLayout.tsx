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
        justifyContent: {
          xs: "space-between",
          sm: "flex-start",
        },
        flexWrap: {
          xs: "wrap",
          sm: "nowrap",
        },
      }}
    >
      {children}
    </Container>
  );
}
