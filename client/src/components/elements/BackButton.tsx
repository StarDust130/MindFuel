"use client";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const handleBackClick = () => {
    if (document.referrer.includes("/login")) {
      router.push("/"); // Redirect to home if coming from /login
    } else {
      router.back(); // Go back to the previous page
    }
  };

  return (
    <Button
      variant={"ghost"}
      className="fixed top-2 left-0 md:top-5 md:left-5"
      onClick={handleBackClick}
    >
      <ChevronLeft />
    </Button>
  );
};

export default BackButton;
