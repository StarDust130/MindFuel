import BackButton from "../elements/BackButton";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const ForgetPassword = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen w-full px-4">
        <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
        <p className="text-center mb-6">
          Enter your email below and we’ll send you a reset link.
        </p>

        <div className="w-full max-w-sm">
          <Label htmlFor="email" className="block mb-2 text-sm">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            className="mb-4 w-full"
          />

          <Button className="w-full">Send Reset Link</Button>
        </div>
      </div>

      <BackButton />
    </>
  );
};
