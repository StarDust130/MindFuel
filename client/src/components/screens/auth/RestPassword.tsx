"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import BackButton from "../../elements/BackButton";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { resetPasswordSchema } from "@/utils/formSchema";

// Define the schema for the password validation using Zod


const ResetPassword = ({ resetToken }: { resetToken: string }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Initialize form with Zod validation
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    setLoading(true);

    try {
      // Send request to reset password
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/resetPassword/${resetToken}`,
        { password: values.password }
      );

      toast({
        title: "Password Reset Successfully 🌤️",
        description: "You have successfully reset your password.",
      });

      router.push("/profile");
    } catch (error) {
      // Type assertion for error
      const axiosError = error as AxiosError;

      console.error(
        "Password reset error:",
        axiosError.response ? axiosError.response.data : axiosError.message
      );
      toast({
        title: "Password Reset Failed 🌧️",
        description: "Unable to reset password. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full px-4">
      <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
      <p className="text-center mb-6">
        Enter your new password below to reset it.
      </p>

      <div className="w-full max-w-sm">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">New Password</label>
            <Input
              type="password"
              placeholder="Enter your new password"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-red-600">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <span className="flex justify-center items-center gap-3">
                Resetting... <Loader size={20} className="animate-spin" />
              </span>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </div>

      <div className="mt-4 text-center text-sm">
        Remembered your password?{" "}
        <Link href="/login" className="underline">
          Login here
        </Link>
      </div>

      <BackButton />
    </div>
  );
};

export default ResetPassword;
