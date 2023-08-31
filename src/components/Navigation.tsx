import AppLink from "./AppLink";
import AppBlockWrapper from "./AppBlockWrapper";
import Heading from "./Heading";
import { Divider } from "@mui/material";

function Navigation() {
  return (
    <AppBlockWrapper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexShrink: 0,
        py: 1,
        ml: 1,
      }}
    >
      <Heading sx={{ mb: 1 }}>Pages</Heading>
      <AppLink id="general" />
      <Divider sx={{ bgcolor: "primary.contrastText", width: "100%" }} />
      {[1, 2, 3].map((item, index) => (
        <AppLink id={item.toString()} key={index} />
      ))}
    </AppBlockWrapper>
  );
}

export default Navigation;
