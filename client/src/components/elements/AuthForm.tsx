import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthData = {
  email: string;
  password: string;
  username?: string;
};

type AuthFormProps = {
  title: string;
  description: string;
  submitText: string;
  footerText: string;
  footerLink: string;
  footerLinkText: string;
  image: string;
  type: "login" | "signup";
  data: AuthData;
  setData: React.Dispatch<React.SetStateAction<AuthData>>;
};

const AuthForm = ({
  title,
  description,
  submitText,
  footerText,
  footerLink,
  footerLinkText,
  image,
  type,
  data,
  setData,
}: AuthFormProps) => {
    
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., API call)
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[700px] mt-3">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-balance text-muted-foreground">{description}</p>
          </div>
          <div className="grid gap-4">
            {type === "signup" && (
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="username"
                  value={data.username}
                  onChange={handleChange}
                  placeholder="m@example.com"
                  required
                />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={handleChange}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {type === "login" && (
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                )}
              </div>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={data.password}
                onChange={handleChange}
                required
              />
            </div>
            <Button onClick={handleSubmit} type="submit" className="w-full">
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
