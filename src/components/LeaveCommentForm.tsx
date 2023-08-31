import Heading from "./Heading";
import TextButton from "./TextButton";
import AppTextField from "./AppTextField";

function LeaveCommentForm() {
  return (
    <form className="form_padding">
      <Heading>Leave comment</Heading>
      <AppTextField sx={{ my: 1 }} required label="Text" multiline />
      <TextButton>Submit</TextButton>
    </form>
  );
}

export default LeaveCommentForm;
