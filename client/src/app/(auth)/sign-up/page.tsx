import Signup from "@/components/screens/Signup"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Up to MindFuel",
};

const SignUpPage = () => {
  return (
    <div><Signup /></div>
  )
}
export default SignUpPage