import { Paper, Avatar, Typography, Button } from "@mui/material";

export default function UserAccount() {
  return (
    <Paper>
      <Avatar>Example</Avatar>
      <Typography>Name Surname</Typography>
      <Typography>Since 12.12.2012</Typography>
      <Button>Edit account</Button>
      <Button>Logout</Button>
      <Button>Delete account</Button>
    </Paper>
  );
}
