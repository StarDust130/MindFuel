import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header>
      <div className="w-full flex h-16 items-center gap-8 px-6 lg:px-8">
        <Link href="/" aria-label="Home" className="block">
          <Image src="/logo-no-bg.png" alt="logo" width={80} height={80} />
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
            <div className="flex gap-4">
              <Link href="/login">
                <Button>Login</Button>
              </Link>

              <Link href="/sign-up">
                <Button variant="ghost">Sign Up</Button>
              </Link>
            </div>

            <button className="block p-2.5 md:hidden hover:bg-gray-100 rounded">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
