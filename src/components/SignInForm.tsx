import AppBlockWrapper from "./AppBlockWrapper";
import { useState } from "react";
import Heading from "./Heading";
import TextButton from "./TextButton";
import AppTextField from "./AppTextField";
import AppImagePicker from "./AppImagePicker";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

function SignInForm() {
  const [value, setValue] = useState<File | null>(null);

  const handleChange = (newValue: File | null) => {
    setValue(newValue);
  };

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
      <form className="form_sign-in">
        <Heading sx={{ mb: 1 }}>Sign in</Heading>
        <AppTextField
          sx={{
            my: 1,
          }}
          required
          label="Login"
        />
        <AppTextField
          sx={{
            my: 1,
          }}
          required
          label="Email"
          type="email"
        />
        <AppTextField
          type="password"
          sx={{ my: 1 }}
          required
          label="Password"
        />
        <AppImagePicker
          sx={{ my: 1 }}
          label="Select avatar"
          value={value}
          onChange={handleChange}
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
            name="radio-buttons-group"
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
        <TextButton>Submit</TextButton>
      </form>
    </AppBlockWrapper>
  );
}

export default SignInForm;
