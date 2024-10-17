"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie"; // Import js-cookie
import LogoutButton from "./LogoutButton";
import { Button } from "@/components/ui/button";

const AuthButtons: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null represents loading state

  useEffect(() => {
    const accessToken = Cookies.get("accessToken"); // Use js-cookie to read the token
    console.log("Access Token from Cookie:", accessToken); // Log token to debug
    setIsLoggedIn(!!accessToken); // Set state based on token presence
  }, []);

  if (isLoggedIn === null) {
    return null; // Return null if the state is still loading
  }

  const handleLogout = () => {
    Cookies.remove("accessToken"); // Remove the token on logout
    setIsLoggedIn(false); // Update state on logout
  };

  return isLoggedIn ? (
    <div className="flex gap-2">
      <Link href="/profile">
        <Button>Get Started</Button>
      </Link>
      <LogoutButton onLogout={handleLogout} />
    </div>
  ) : (
    <>
      <Link href="/login">
        <Button>Login</Button>
      </Link>
      <Link href="/sign-up">
        <Button variant="ghost">Sign Up</Button>
      </Link>
    </>
  );
};

export default AuthButtons;
