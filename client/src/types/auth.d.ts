declare interface AuthSignIn {
  email: string;
  password: string;
}

declare interface AuthSignUp extends AuthSignIn {
  name: string;
}
