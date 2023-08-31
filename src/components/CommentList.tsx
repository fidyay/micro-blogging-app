import Comment from "./Comment";
import Heading from "./Heading";
import { Accordion, Divider } from "@mui/material";

interface CommentListProps {
  expanded?: boolean;
}

function CommentList({ expanded = false }: CommentListProps) {
  return (
    <Accordion
      sx={{
        bgcolor: "primary.dark",
        color: "primary.contrastText",
        border: "none !important",
      }}
      expanded={expanded}
      elevation={0}
    >
      <Divider sx={{ bgcolor: "primary.contrastText" }} />
      <Heading sx={{ m: 1 }}>Comments</Heading>
      {[1, 2, 3].map((comment, index) => (
        <Comment key={index} />
      ))}
    </Accordion>
  );
}

export default CommentList;
