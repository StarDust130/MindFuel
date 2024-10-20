import RestPassword from "@/components/screens/auth/RestPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rest Password",
  description: "Reset Password to MindFuel",
};

export default function Page({ params }: { params: { resetToken: string } }) {
  const { resetToken } = params;
  return <RestPassword resetToken={resetToken as string} />;
}
