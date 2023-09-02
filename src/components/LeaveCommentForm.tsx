import Heading from "./Heading";
import TextButton from "./TextButton";
import AppTextField from "./AppTextField";
import { useForm, SubmitHandler, UseFormReset } from "react-hook-form";
import { useUser, useSupabaseClient, User } from "@supabase/auth-helpers-react";
import { useMutation, useQueryClient } from "react-query";

interface Inputs {
  text: string;
}

function useLeaveCommentMutation(
  postId: string,
  resetForm: UseFormReset<Inputs>
) {
  const supabaseClient = useSupabaseClient();
  const queryClient = useQueryClient();
  const user = useUser();
  async function leaveComment(userData: Inputs) {
    const { data, error } = await supabaseClient.from("comments").insert([
      {
        text: userData.text,
        post_id: postId,
        commentator_id: (user as User).id,
      },
    ]);
    if (error) console.error(error);
  }
  return useMutation(async (userData: Inputs) => leaveComment(userData), {
    onError: console.error,
    onSuccess() {
      resetForm();
      queryClient.invalidateQueries(["comments"]);
    },
  });
}
interface LeaveCommentFormProps {
  postId: string;
}

function LeaveCommentForm({ postId }: LeaveCommentFormProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const leaveCommentMutation = useLeaveCommentMutation(postId, reset);
  return (
    <form
      onSubmit={handleSubmit(
        leaveCommentMutation.mutate as SubmitHandler<Inputs>
      )}
      className="form_padding"
    >
      <Heading>Leave comment</Heading>
      <AppTextField
        register={register("text")}
        sx={{ my: 1 }}
        required
        label="Text"
        multiline
      />
      <TextButton disabled={leaveCommentMutation.isLoading} type="submit">
        Submit
      </TextButton>
    </form>
  );
}

export default LeaveCommentForm;
