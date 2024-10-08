import AuthForm from "../elements/AuthForm";

function Login() {
  return (
    <AuthForm
      title="Login"
      description="Enter your email below to login to your account"
      submitText="Login"
      footerText="Don't have an account?"
      footerLink="/sign-up"
      footerLinkText="Sign up"
      image="/anime-girl-1.jpg"
      type="login"
    />
  );
}

export default Login;
