// handleLogout.ts
import axios from "axios";

export const handleLogout = async (): Promise<boolean> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/logout`
    );
    return response.status === 200;
  } catch (error) {
    console.error("Error logging out:", error);
    return false;
  }
};
