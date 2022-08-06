import { FC, useState } from "react";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CustomButton from "components/custom-button";
import SignInAndSignUpLayout from "layouts/sign-in-and-sign-up";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { httpAuthSignUp } from "services/auth";

const schema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().min(3).required(),
  password: yup.string().min(8).required()
});

const SignUpPage: FC = () => {
  const [modalMessage, setModalMessage] = useState("");

  const {
    reset: handleFormReset,
    register,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm<AuthSignUp>({
    resolver: yupResolver(schema),
    mode: "onChange"
  });

  const handleSignUp = async (formData: AuthSignUp) => {
    try {
      const { data } = await httpAuthSignUp(formData);
      handleFormReset();

      const message = `Congratulation ${data.user.name}, 
      with registration! Follow to Sign In page to Login!`;

      setModalMessage(message);
    } catch (error) {
      if (error instanceof AxiosError) {
        setModalMessage(error.response?.data.error);
      }
    }
  };

  return (
    <SignInAndSignUpLayout
      isSignUp
      modalMessage={modalMessage}
      onModalClose={() => setModalMessage("")}
      showModal={Boolean(modalMessage)}
    >
      <Box component="form" onSubmit={handleSubmit(handleSignUp)}>
        <Stack spacing="24px">
          <TextField
            error={!!errors.email}
            helperText={errors?.email?.message}
            label="Email"
            placeholder="Enter a email"
            {...register("email")}
          />

          <TextField
            error={!!errors.name}
            helperText={errors?.name?.message}
            label="Name"
            placeholder="Enter a name"
            {...register("name")}
          />

          <TextField
            error={!!errors.password}
            helperText={errors?.password?.message}
            label="Password"
            type="password"
            placeholder="Enter a password"
            {...register("password")}
          />

          <CustomButton type="submit" theme="primary" disabled={!isValid}>
            Register
          </CustomButton>
        </Stack>
      </Box>
    </SignInAndSignUpLayout>
  );
};

SignUpPage.displayName = "SignUpPage";

export default SignUpPage;
