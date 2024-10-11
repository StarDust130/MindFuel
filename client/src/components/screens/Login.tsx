"use client";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { ChevronLeft, Loader } from "lucide-react";
import { loginSchema } from "@/utils/formSchema";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Submitting login form: ", values);
      const { email, password } = values;

      // Send the login request
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        { email, password }
      );

      toast({
        title: "Login successful 🎉",
        description: "You are now logged in.",
      });

      router.push("/");
    } catch (err) {
      console.error("Error during login:", err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[700px] mt-3">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          {error && <p className="text-red-600">{error}</p>}
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type="password"
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
                    Logging in... <Loader size={20} className="animate-spin" />
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up here
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block mr-1 rounded-2xl h-[95vh]">
        <Image
          src="/anime-girl-1.jpg"
          width="1920"
          height="1080"
          className="h-full w-full object-cover rounded-2xl dark:brightness-[1.2]"
          alt="login-image"
        />
      </div>
      <Link href="/">
        <Button
          variant={"ghost"}
          className="absolute top-2 left-0 md:top-5 md:left-5"
        >
          <ChevronLeft />
        </Button>
      </Link>
    </div>
  );
};

export default LoginForm;
