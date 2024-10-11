import LoginForm from "@/components/screens/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to MindFuel",
};

const LoginPage = () => {
  return <div><LoginForm /></div>;
};
export default LoginPage;
