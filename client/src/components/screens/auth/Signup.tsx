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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Image from "next/image";
import { Loader } from "lucide-react";
import { registerSchema } from "@/utils/formSchema";
import BackButton from "@/components/elements/BackButton";

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
        description: "Have fun learning!",
      });

      router.push("/profile");
    } catch (err) {
      console.error("Error during registration:", err);

      if (axios.isAxiosError(err)) {
        // Handle Axios errors with a response from the server
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message); // Error message from the server
        } else {
          setError(err.message); // Fallback to Axios error message
        }
      } else if (err instanceof Error) {
        // Handle non-Axios errors (e.g., generic JS errors)
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again."); // Fallback message
      }
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
                      <Input placeholder="Satoru Gojo" {...field} />
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="teacher">Teacher</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="flex justify-center items-center gap-3">
                    Signing up...
                    <Loader size={20} className="animate-spin" />
                  </span>
                ) : (
                  "Sign Up"
                )}
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
      <BackButton />
    </div>
  );
};

export default SignUpForm;
