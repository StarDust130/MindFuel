"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { Button } from "@/components/ui/button";


const AuthButtons: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null represents loading state

  useEffect(() => {
    const accessToken = document.cookie.includes("accessToken");
    setIsLoggedIn(accessToken); // Set true/false based on the token check
  }, []);

  if (isLoggedIn === null) {
    return null; // Return null if the state is still loading
  }

  const handleLogout = () => {
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
