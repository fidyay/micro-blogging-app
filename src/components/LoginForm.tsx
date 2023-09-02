import AppBlockWrapper from "./AppBlockWrapper";
import Heading from "./Heading";
import TextButton from "./TextButton";
import AppTextField from "./AppTextField";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import AppTextLink from "./AppTextLink";
import ErrorText from "./ErrorText";

function useLoginMutation() {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  async function Login(userData: Inputs) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    });
  }
  return useMutation(async (userData: Inputs) => Login(userData), {
    onError: console.error,
    onSuccess() {
      router.push("/feed/general");
    },
  });
}

interface Inputs {
  email: string;
  password: string;
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const loginMutation = useLoginMutation();

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
        onSubmit={handleSubmit(loginMutation.mutate as SubmitHandler<Inputs>)}
        className="form_sign-in"
      >
        <Heading sx={{ mb: 1 }}>Login</Heading>
        {Object.keys(errors).length ? <ErrorText /> : null}
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
        <AppTextLink href="/sign-up">Or you can sign up.</AppTextLink>
        <TextButton disabled={loginMutation.isLoading} type="submit">
          Submit
        </TextButton>
      </form>
    </AppBlockWrapper>
  );
}

export default LoginForm;
