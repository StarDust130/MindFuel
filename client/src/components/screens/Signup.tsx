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
import { ChevronLeft } from "lucide-react";
import { registerSchema } from "@/utils/formSchema";



const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "student",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Submitting register form: ", values);
      const { username, email, password, role } = values;

      // Send the registration request
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        { username, email, password, role }
      );

      toast({
        title: "Account created successfully 🎉",
        description: "You can now log in.",
      });

      router.push("/login");
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[700px] mt-3">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Create a new account to get started
            </p>
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your-email@example.com" {...field} />
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
                    <FormLabel>Password</FormLabel>
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
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <select {...field} className="input">
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Log in here
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block mr-1 rounded-2xl h-[95vh]">
        <Image
          src="/anime-girl-2.jpg"
          width="1920"
          height="1080"
          className="h-full w-full object-cover rounded-2xl dark:brightness-[1.2]"
          alt="register-image"
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

export default SignUpForm;
