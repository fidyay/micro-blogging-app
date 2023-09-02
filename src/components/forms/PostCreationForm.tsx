import AppBlockWrapper from "../shared/AppBlockWrapper";
import Heading from "../shared/Heading";
import TextButton from "../shared/TextButton";
import AppTextField from "../shared/AppTextField";
import AppImagePicker from "../shared/AppImagePicker";
import {
  useForm,
  Controller,
  SubmitHandler,
  UseFormReset,
} from "react-hook-form";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useMutation, useQueryClient } from "react-query";
import ErrorText from "../shared/ErrorText";

interface Inputs {
  title: string;
  description: string;
  img: File | null;
}

function useCreatePostMutation(resetForm: UseFormReset<Inputs>) {
  const queryClient = useQueryClient();
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  async function createPost(postData: Inputs) {
    const { data: postDbData, error: postError } = await supabaseClient
      .from("posts")
      .insert([
        {
          title: postData.title,
          description: postData.description,
          has_image: !!postData.img,
          author_id: user?.id as string,
        },
      ])
      .select();
    if (postError) console.error(postError);
    if (postDbData && postData.img) {
      const savedPost = postDbData[0];
      const { data, error } = await supabaseClient.storage
        .from("images")
        .upload(`post_pictures/${savedPost.id}`, postData.img, {
          cacheControl: "3600",
          upsert: false,
        });
    }
  }
  return useMutation(async (postData: Inputs) => createPost(postData), {
    onError: console.error,
    onSuccess() {
      resetForm();
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
}

function FormCreationForm() {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      img: null,
    },
  });

  const createPostMutation = useCreatePostMutation(reset);

  return (
    <AppBlockWrapper sx={{ mb: 1, p: 1 }}>
      <form
        onSubmit={handleSubmit(
          createPostMutation.mutate as SubmitHandler<Inputs>
        )}
      >
        <Heading>Create post</Heading>
        {Object.keys(errors).length ? <ErrorText /> : null}
        <AppTextField
          sx={{
            my: 1,
          }}
          required
          label="Title"
          multiline
          register={register("title")}
        />
        <AppTextField
          sx={{ my: 1 }}
          required
          label="Description"
          multiline
          minRows={3}
          register={register("description")}
        />
        <Controller
          name="img"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <AppImagePicker
                {...field}
                helperText={fieldState.invalid ? "File is invalid" : ""}
                error={fieldState.invalid}
                sx={{ my: 1 }}
                label="Select image"
              />
            );
          }}
        />
        <TextButton disabled={createPostMutation.isLoading} type="submit">
          Submit
        </TextButton>
      </form>
    </AppBlockWrapper>
  );
}

export default FormCreationForm;
