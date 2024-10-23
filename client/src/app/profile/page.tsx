"use client";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Info, Pencil, Trash, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { UserCard } from "@/components/elements/UserCard";

// Define the User interface for type safety
export interface User {
  _id: string;
  username: string;
  email: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  passwordChangedAt?: string;
}

const Page: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // State to store fetched users
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [editId, setEditId] = useState<string | null>(null); // Edit mode state
  const [editData, setEditData] = useState<Partial<User>>({}); // State to store the current edit data
  const [userInfoData, setUserInfoData] = useState<Partial<User>>({}); // State to store the current edit data

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

  const getUserInfo = async (user: User) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/getAllInfo/${user._id}`,
        {
          withCredentials: true,
        }
      );
      setUserInfoData(res.data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  };

  //! Handle Delete All
  const handleDeleteAll = async () => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/deleteAll`,
        {
          withCredentials: true,
        }
      );

      router.push("/sign-up");

      toast({
        title: "All Users Deleted",
        description: res.data?.message || "All users deleted successfully 🔪",
      });

      setUsers([]);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  };

  //! Handle Delete User
  const DeleteUser = async (user: User) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/deleteMe/${user._id}`,
        {
          withCredentials: true,
        }
      );

      toast({
        title: `${user.username} deleted successfully!`,
        description: res.data?.message || "User deleted successfully 🔪",
      });

      setUsers((prevUsers) => prevUsers.filter((u) => u._id !== user._id));
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  };

  //! handleEditClick
  const handleEditClick = (user: User) => {
    setEditId(user._id); // Set edit mode
    setEditData(user); // Load current user data into the form
  };

  //! handleInputChange
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const updateUser = async () => {
    if (!editId || !editData.username || !editData.email) return;

    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/updateMe/${editId}`,
        { username: editData.username, email: editData.email },
        {
          withCredentials: true,
        }
      );

      toast({
        title: `${editData.username} updated successfully!`,
        description: res.data?.message || "User updated successfully 🎉",
      });

      // Update the user in the UI
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === editId ? { ...u, ...editData } : u))
      );

      setEditId(null); // Exit edit mode
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-red-600 text-center">Error: {error}</div>;

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-2xl text-center font-bold">Users</h1>
      </div>

      <div className="flex justify-end pl-10 mb-3">
        <Button onClick={handleDeleteAll}>
          <span className="flex justify-center items-center gap-2 ">
            Delete All <Trash2 size={18} />
          </span>
        </Button>
      </div>

      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Username</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6">Tools</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-200 hover:bg-gray-100 transition duration-150 ease-in-out"
              >
                <td className="py-3 px-6">
                  {editId === user._id ? (
                    <Input
                      type="text"
                      name="username"
                      value={editData.username || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td className="py-3 px-6">
                  {editId === user._id ? (
                    <Input
                      type="email"
                      name="email"
                      value={editData.email || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="py-3 px-6">
                  <div className="flex justify-center items-center gap-4 cursor-pointer">
                    <Dialog>
                      <DialogTrigger>
                        {" "}
                        <Info
                          color="orange"
                          onClick={() => getUserInfo(user)}
                        />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogDescription>
                            <UserCard user={user} />
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>

                    {editId === user._id ? (
                      <Save color="green" onClick={updateUser} />
                    ) : (
                      <Pencil
                        color="green"
                        onClick={() => handleEditClick(user)}
                      />
                    )}
                    <Trash color="red" onClick={() => DeleteUser(user)} />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="py-3 px-6 text-center">
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
