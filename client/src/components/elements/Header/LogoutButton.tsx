"use client";

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import Cookies from "js-cookie"; // Import js-cookie

interface LogoutButtonProps {
  onLogout?: () => void; // Make onLogout optional
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
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
      if (onLogout) {
        onLogout(); // Notify parent component if onLogout is provided
      }
      router.push("/"); // Redirect to the home page
    } else {
      toast({
        title: "Logout failed 😞",
        description: "Something went wrong.",
      });
    }
  };

  return (
    <Button onClick={onLogoutClick} variant="secondary">
      Logout
    </Button>
  );
};

export default LogoutButton;
