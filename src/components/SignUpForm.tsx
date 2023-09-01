import AppBlockWrapper from "./AppBlockWrapper";
import Heading from "./Heading";
import TextButton from "./TextButton";
import AppTextField from "./AppTextField";
import AppImagePicker from "./AppImagePicker";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

function useSignUpMutation() {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  async function signUp(userData: Inputs) {
    const { data: authData, error: authError } =
      await supabaseClient.auth.signUp({
        email: userData.email,
        password: userData.password,
      });
    if (!authError) {
      const { error: userError } = await supabaseClient.from("users").insert([
        {
          id: authData.user?.id,
          name: userData.name,
          is_author: userData.role !== "commentator",
          has_avatar: !!userData.avatar,
        },
      ]);
      if (!userError && userData.avatar) {
        const { data, error } = await supabaseClient.storage
          .from("images")
          .upload(`avatars/${authData.user?.id}`, userData.avatar, {
            cacheControl: "3600",
            upsert: false,
          });
      }
    }
  }
  return useMutation(async (userData: Inputs) => signUp(userData), {
    onError: console.error,
    onSuccess() {
      router.push("/general");
    },
  });
}

interface Inputs {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: File | null;
}

function SignUpForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      avatar: null,
    },
  });

  const signUpMutation = useSignUpMutation();

  return (
    <AppBlockWrapper
      sx={{
        width: 300,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: 1,
      }}
    >
      <form
        onSubmit={handleSubmit(signUpMutation.mutate as SubmitHandler<Inputs>)}
        className="form_sign-in"
      >
        <Heading sx={{ mb: 1 }}>Sign up</Heading>
        {Object.keys(errors).length ? (
          <Typography sx={{ color: "warning.main" }}>
            Some error occured :(
          </Typography>
        ) : null}
        <AppTextField
          sx={{
            my: 1,
          }}
          required
          label="Name"
          register={register("name")}
        />
        <AppTextField
          sx={{
            my: 1,
          }}
          required
          label="Email"
          type="email"
          register={register("email")}
        />
        <AppTextField
          type="password"
          sx={{ my: 1 }}
          required
          label="Password"
          register={register("password")}
        />
        <Controller
          name="avatar"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <AppImagePicker
                {...field}
                helperText={fieldState.invalid ? "File is invalid" : ""}
                error={fieldState.invalid}
                sx={{ my: 1 }}
                label="Select avatar"
              />
            );
          }}
        />

        <FormControl>
          <FormLabel
            sx={{
              color: "primary.contrastText",
              "&.Mui-focused": { color: "primary.contrastText" },
            }}
          >
            Role
          </FormLabel>
          <RadioGroup
            sx={{ mb: 1 }}
            aria-labelledby="radio-buttons-group-label"
            defaultValue="commentator"
            {...register("role")}
          >
            <FormControlLabel
              value="commentator"
              control={
                <Radio
                  sx={{
                    color: "primary.contrastText",
                    "&.Mui-checked": {
                      color: "secondary.contrastText",
                    },
                  }}
                />
              }
              label="Commentator"
            />
            <FormControlLabel
              value="author"
              control={
                <Radio
                  sx={{
                    color: "primary.contrastText",
                    "&.Mui-checked": {
                      color: "secondary.contrastText",
                    },
                  }}
                />
              }
              label="Author"
            />
          </RadioGroup>
        </FormControl>
        <TextButton type="submit">Submit</TextButton>
      </form>
    </AppBlockWrapper>
  );
}

export default SignUpForm;
