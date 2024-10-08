import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthFormProps = {
  title: string;
  description: string;
  submitText: string;
  extraInput?: React.ReactNode; // This will be for the extra input in the sign-up form
  footerText: string;
  footerLink: string;
  footerLinkText: string;
  image: string;
};

const AuthForm = ({
  title,
  description,
  submitText,
  extraInput,
  footerText,
  footerLink,
  footerLinkText,
  image,
}: AuthFormProps) => {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[700px] mt-3">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-balance text-muted-foreground">{description}</p>
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
            {extraInput && <div className="grid gap-2">{extraInput}</div>}
            <Button type="submit" className="w-full">
              {submitText}
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {footerText}{" "}
            <Link href={footerLink} className="underline">
              {footerLinkText}
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block mr-1  h-[95vh] ">
        <Image
          src={image}
          width="1920"
          height="1080"
          className="h-full w-full object-cover rounded-2xl dark:brightness-[1.2]"
          alt="anime-girl"
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

export default AuthForm;
