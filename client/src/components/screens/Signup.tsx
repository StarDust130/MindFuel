
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const description =
  "A Signup page with two columns. The first column has the Signup form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";

function Signup() {
  return (
    <div className="w-full lg:grid  lg:grid-cols-2 ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Signup</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to Signup to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              SignUp
            </Button>
            <Button variant="outline" className="w-full">
              Signup with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already  have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/anime-girl-2.jpg"
          width="1920"
          height="1080"
          className="h-full w-full object-cover rounded-2xl dark:brightness-[1.2] "
          alt="anime-girl"
        />
      </div>

      <Button
        variant={"ghost"}
        className="absolute top-2 left-0 md:top-5 md:left-5"
      >
        <Link href="/">
          <ChevronLeft />
        </Link>
      </Button>
    </div>
  );
}

export default Signup;
