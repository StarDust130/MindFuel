import AuthForm from "../elements/AuthForm";
import { Input } from "../ui/input";
import { Label } from "../ui/label";


function SignUp() {
  return (
    <AuthForm
      title="Sign Up"
      description="Enter your details below to create a new account"
      submitText="Sign Up"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Login"
      image="/anime-girl-2.jpg"
      extraInput={
        <>
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input id="confirm-password" type="password" required />
        </>
      }
    />
  );
}

export default SignUp;
