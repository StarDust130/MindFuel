"use client";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Info, Pencil, Trash, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Define the User interface for type safety
interface User {
  _id: string;
  username: string;
  email: string;
}

const Page: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // State to store fetched users
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const { toast } = useToast();
  const router = useRouter();

  //! Fetch users data from the API
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Start loading

      try {
        // Fetch users data with axios
        const response: AxiosResponse<{ data: { users: User[] } }> =
          await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}`, {
            withCredentials: true, // Ensure cookies are included in the request
          });

        // Set users from response
        setUsers(response.data.data.users);
      } catch (err: any) {
        // Set error message based on error
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false); // Stop loading spinner after request is done
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteAll = async () => {
    try {
      // Send a DELETE request to the API
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/deleteAll`,
        {
          withCredentials: true, // Ensure cookies are included in the request
        }
      );

      router.push("/sign-up");

      toast({
        title: "All User Delete ",
        description: `${
          res.data?.message || "All User Delete Succesfully 🔪"
        } `,
      });

      // Set users to an empty array
      setUsers([]);
    } catch (err: any) {
      // Set error message based on error
      setError(err.response?.data?.message || err.message);
    }
  };

  // Handle loading state
  if (loading) return <div className="text-center">Loading...</div>;

  // Handle error state
  if (error)
    return <div className="text-red-600 text-center">Error: {error}</div>;

  // Main UI rendering
  return (
    <div className="overflow-x-auto p-4">
      <div className="flex justify-center  items-center mb-4">
        <h1 className="text-2xl text-center font-bold">Users</h1>
      </div>

      <div className="flex justify-end pl-10">
        <Button onClick={handleDeleteAll}>
          <span className="flex justify-center items-center gap-2">
            Delete All <Trash2 size={18} />
          </span>
        </Button>
      </div>

      <div className="w-full  flex items-end justify-end px-20 py-2 cursor-pointer"></div>
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Username</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 ">Tools</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-200 hover:bg-gray-100 transition duration-150 ease-in-out"
              >
                <td className="py-3 px-6">{user.username}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">
                  <div className="flex justify-center w-full items-center gap-4 cursor-pointer">
                    <Info color="orange" />
                    <Pencil color="green" />
                    <Trash color="red" />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="py-3 px-6 text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
