"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import BackButton from "../elements/BackButton";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
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
} from "../ui/form";
import Link from "next/link";

export const ForgetPassword = () => {
  // forgetPassword schema
  const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgetPasswordSchema>) => {
    console.log(values);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen w-full px-4">
        <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
        <p className="text-center mb-6">
          Enter your email below and we’ll send you a reset link.
        </p>

        <div className="w-full max-w-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <Button className="w-full mt-3" type="submit">
                Send Reset Link
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
      </div>

      <BackButton />
    </>
  );
};
