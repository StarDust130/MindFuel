"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { Button } from "@/components/ui/button";

const AuthButtons = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = document.cookie.includes("accessToken");
    setIsLoggedIn(accessToken);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false); // Update state when user logs out
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
