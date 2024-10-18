"use client";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Extract accessToken from cookies
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("accessToken="))
          ?.split("=")[1];

        // Check if token exists, if not, throw an error
        if (!token) {
          throw new Error("Authorization token not found");
        }

        // Fetch users data with axios
        const response: AxiosResponse<{ data: { users: User[] } }> =
          await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
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

  // Handle loading state
  if (loading) return <div className="text-center">Loading...</div>;

  // Handle error state
  if (error)
    return <div className="text-red-600 text-center">Error: {error}</div>;

  // Main UI rendering
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Username</th>
            <th className="py-3 px-6 text-left">Email</th>
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
