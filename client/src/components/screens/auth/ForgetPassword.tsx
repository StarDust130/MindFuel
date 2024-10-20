"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import BackButton from "../../elements/BackButton";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useForm } from "react-hook-form";
import { forgetPasswordSchema } from "@/utils/formSchema";
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
import Image from "next/image";

export const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Initialize form schema
  const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgetPasswordSchema>) => {
    setLoading(true);
    setError(null);

    try {
      const { email } = values;

      // Send request to backend
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/forgetPassword`,
        { email }
      );

      // Success message
      setSuccess(true);
      toast({
        title: "Email Sent Successfully 📬",
        description: "Check your email for the reset link",
      });
    } catch (err) {
      // Log the error for debugging
      console.error("Error during password reset:", err);

      // Handle different backend error scenarios more specifically
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError("Email not found. Please check and try again.");
          toast({
            title: "Email Not Found",
            description: "The email you entered does not exist in our records.",
            variant: "destructive",
          });
        } else if (err.response?.status === 400) {
          setError("Invalid email format.");
        } else {
          setError("Something went wrong. Please try again later.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen w-full px-4">
        <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
        <p className="text-center mb-6">
          Enter your email below and we’ll send you a reset link.
        </p>

        {error && <p className="text-red-600">{error}</p>}

        {!success ? (
          <>
            <div className="w-full max-w-sm">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="gojo@satoru.jjk" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <span className="flex justify-center items-center gap-3">
                        Sending Email...{" "}
                        <Loader size={20} className="animate-spin" />
                      </span>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link href="/sign-up" className="underline">
                Sign up here
              </Link>
            </div>
          </>
        ) : (
          <div className="w-full max-w-sm">
            <Image
              src="/email.gif"
              alt="Email Sent"
              className="w-40 h-40 mx-auto"
              width={160}
              height={160}
            />
            <p className="text-green-600 text-center font-serif font-semibold">
              Email sent successfully! Check your inbox for the reset link.
            </p>
          </div>
        )}
      </div>

      <BackButton />
    </>
  );
};
