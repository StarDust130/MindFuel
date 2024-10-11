"use client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Cookies from "js-cookie"; // Import js-cookie

const LogoutButton: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();

  const onLogoutClick = async (): Promise<void> => {
    Cookies.remove("accessToken");
    const success: boolean = !Cookies.get("accessToken");

    if (success) {
      toast({
        title: "Logout successful 🎉",
        description: "You have been logged out.",
      });
      router.push("/");
    } else {
      toast({
        title: "Logout failed 😞",
        description: "Something went wrong.",
      });
    }
  };

  return (
    <Button onClick={onLogoutClick} variant={"secondary"}>
      Logout
    </Button>
  );
};

export default LogoutButton;
