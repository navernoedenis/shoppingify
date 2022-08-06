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

import { httpAuthSignIn } from "services/auth";
import { setUserToStorage } from "services/storage";
import { refreshPage } from "helpers/refresh-page";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required()
});

const SignInPage: FC = () => {
  const [modalMessage, setModalMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm<AuthSignIn>({
    resolver: yupResolver(schema),
    mode: "onChange"
  });

  const handleSignIn = async (formData: AuthSignIn) => {
    try {
      const { data } = await httpAuthSignIn(formData);
      setUserToStorage(data.user);
      refreshPage();
    } catch (error) {
      if (error instanceof AxiosError) {
        setModalMessage(error.response?.data.error);
      }
    }
  };

  return (
    <SignInAndSignUpLayout
      modalMessage={modalMessage}
      onModalClose={() => setModalMessage("")}
      showModal={Boolean(modalMessage)}
    >
      <Box component="form" onSubmit={handleSubmit(handleSignIn)}>
        <Stack spacing="24px">
          <TextField
            error={!!errors.email}
            helperText={errors?.email?.message}
            label="Email"
            placeholder="Enter a email"
            {...register("email")}
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
            Login
          </CustomButton>
        </Stack>
      </Box>
    </SignInAndSignUpLayout>
  );
};

SignInPage.displayName = "SignInPage";

export default SignInPage;
