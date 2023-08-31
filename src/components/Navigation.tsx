import { Paper } from "@mui/material";
import AppLink from "./AppLink";

function Navigation() {
  return (
    <Paper>
      <AppLink id="general" />
      {[1, 2, 3].map((item, index) => (
        <AppLink id={item.toString()} key={index} />
      ))}
    </Paper>
  );
}

export default Navigation;
