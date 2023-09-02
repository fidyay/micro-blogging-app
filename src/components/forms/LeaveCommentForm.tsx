import Heading from "../shared/Heading";
import TextButton from "../shared/TextButton";
import AppTextField from "../shared/AppTextField";
import { useForm, SubmitHandler, UseFormReset } from "react-hook-form";
import { useUser, useSupabaseClient, User } from "@supabase/auth-helpers-react";
import { useMutation, useQueryClient } from "react-query";

interface Inputs {
  text: string;
}

function useLeaveCommentMutation(
  postId: string,
  resetForm: UseFormReset<Inputs>,
  commentsNumber: number
) {
  const supabaseClient = useSupabaseClient();
  const queryClient = useQueryClient();
  const user = useUser();
  async function leaveComment(userData: Inputs) {
    const { data: commentData, error: commentErro } = await supabaseClient
      .from("comments")
      .insert([
        {
          text: userData.text,
          post_id: postId,
          commentator_id: (user as User).id,
        },
      ]);
    if (commentErro) console.error(commentErro);

    const { data: postData, error: postError } = await supabaseClient
      .from("posts")
      .update({ comments_number: commentsNumber + 1 })
      .eq("id", postId);
    if (postError) console.error(postError);
  }
  return useMutation(async (userData: Inputs) => leaveComment(userData), {
    onError: console.error,
    onSuccess() {
      resetForm();
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
}
interface LeaveCommentFormProps {
  postId: string;
  commentsNumber: number;
}

function LeaveCommentForm({ postId, commentsNumber }: LeaveCommentFormProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const leaveCommentMutation = useLeaveCommentMutation(
    postId,
    reset,
    commentsNumber
  );
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
