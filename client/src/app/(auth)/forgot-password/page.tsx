import { ForgetPassword } from "@/components/screens/ForgetPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forget Password",
  description: "Forget Password to MindFuel",
};

const page = () => {
  return <ForgetPassword />;
};
export default page;
