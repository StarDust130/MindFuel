import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cookies } from "next/headers"; // Import cookies API
import LogoutButton from "./LogoutButton";


const Header = () => {

  //! Check for access token in cookies (Server-side in App Router)
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  // Function to render buttons based on login state
  const renderButtons = () => {
    if (accessToken) {
      // If user is logged in (access token exists), show "Get Started" button
      return (
        <div className="flex justify-center items-center gap-2">
          <Link href="/profile">
            <Button>Get Started</Button>
          </Link>
          <LogoutButton />
        </div>
      );
    } else {
      // If user is not logged in, show "Login" and "Sign Up" buttons
      return (
        <>
          <Link href="/login">
            <Button>Login</Button>
          </Link>

          <Link href="/sign-up">
            <Button variant="ghost">Sign Up</Button>
          </Link>
        </>
      );
    }
  };

  return (
    <header>
      <div className="w-full flex h-16 items-center gap-8 px-6 lg:px-8">
        {/* Adjust logo size based on screen size */}
        <Link href="/" aria-label="Home" className="block">
          <Image
            src="/logo-no-bg.png"
            alt="logo"
            width={80}
            height={80}
            className="w-16 h-16 sm:w-12 sm:h-12" // Smaller logo for small screens
          />
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm text-gray-500">
              {[
                "About",
                "Careers",
                "History",
                "Services",
                "Projects",
                "Blog",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="transition text-gray-500 hover:text-black dark:hover:text-white px-2 py-1 rounded"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-4">
              {/* Conditional rendering based on login state */}
              {renderButtons()}
            </div>

            {/* Show Login and Menu for small screens */}
            <div className="md:hidden flex items-center gap-4">
              {/* Conditional rendering for small screens */}
              {accessToken ? (
                <Link href="/get-started">
                  <Button size="sm">Get Started</Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button size="sm">Login</Button>
                </Link>
              )}

              {/* Sheet for small screens with navigation links */}
              <Sheet>
                <SheetTrigger>
                  <Menu />
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>

                  {/* Navigation links for the sheet */}
                  <nav className="mt-4">
                    <ul className="flex flex-col gap-4 text-gray-700 dark:text-gray-300">
                      {[
                        "About",
                        "Careers",
                        "History",
                        "Services",
                        "Projects",
                        "Blog",
                      ].map((item) => (
                        <li key={item}>
                          <Link href="#" className="text-lg">
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  {/* Optional: Add other actions (login, sign up) in the sheet */}
                  <div className="mt-8">
                    {accessToken ? (
                      <Link href="/get-started">
                        <Button size="sm" className="w-full mb-4">
                          Get Started
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Link href="/login">
                          <Button size="sm" className="w-full mb-4">
                            Login
                          </Button>
                        </Link>
                        <Link href="/sign-up">
                          <Button variant="ghost" size="sm" className="w-full">
                            Sign Up
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
