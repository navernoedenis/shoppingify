import client from "client";

export const httpAuthSignIn = async (data: AuthSignIn) => {
  return await client.post<{ user: User }>("/auth/sign-in", data);
};

export const httpAuthSignUp = async (data: AuthSignUp) => {
  return await client.post<{ user: User }>("/auth/sign-up", data);
};
