import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

interface DeleteButton {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function DeleteButton({ onClick }: DeleteButton) {
  return (
    <IconButton
      sx={{ position: "absolute", top: 1, right: 1 }}
      onClick={onClick}
      color="warning"
    >
      <DeleteIcon />
    </IconButton>
  );
}
