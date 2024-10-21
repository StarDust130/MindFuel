"use client";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <div>
      <Button
        variant={"ghost"}
        className="fixed top-2 left-0 md:top-5 md:left-5"
        onClick={() => router.back()}
      >
        <ChevronLeft />
      </Button>
    </div>
  );
};
export default BackButton;
