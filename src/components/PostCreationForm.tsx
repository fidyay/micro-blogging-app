import AppBlockWrapper from "./AppBlockWrapper";
import { TextField } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";
import Heading from "./Heading";
import TextButton from "./TextButton";
import AppTextField from "./AppTextField";

function FormCreationForm() {
  const [value, setValue] = useState<File | null>(null);

  const handleChange = (newValue: File | null) => {
    setValue(newValue);
  };

  return (
    <AppBlockWrapper sx={{ mb: 1, p: 1 }}>
      <form>
        <Heading>Create post</Heading>
        <AppTextField
          sx={{
            my: 1,
          }}
          required
          label="Title"
          multiline
        />
        <AppTextField
          sx={{ my: 1 }}
          required
          label="Description"
          multiline
          minRows={3}
        />
        <MuiFileInput
          inputProps={{ accept: "image/*" }}
          sx={{ my: 1 }}
          fullWidth
          label="Select image"
          value={value}
          onChange={handleChange}
        />
        <TextButton>Submit</TextButton>
      </form>
    </AppBlockWrapper>
  );
}

export default FormCreationForm;
