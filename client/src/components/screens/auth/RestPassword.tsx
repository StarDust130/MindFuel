"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import BackButton from "../../elements/BackButton";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "@/utils/formSchema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

const ResetPassword = ({ resetToken }: { resetToken: string }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Initialize form with schema validation using Zod
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  console.log(process.env.NEXT_PUBLIC_API_URL);

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    console.log("Form submitted with values:", values); // Check if submission works
    setLoading(true);

    try {
      const { password } = values;

      // Send request to reset password
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/resetPassword/${resetToken}`,
        { password }
      );

      toast({
        title: "Password Reset Successfully 🌤️",
        description: "You have successfully reset your password.",
      });

      router.push("/profile");
    } catch (error) {
      console.error("Password reset error:", error);
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
        </Form>
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
