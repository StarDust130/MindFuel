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
  DialogTrigger,
} from "@/components/ui/dialog";

import { UserCard } from "@/components/elements/UserCard";
import BackButton from "@/components/elements/BackButton";
import LogoutButton from "@/components/elements/Header/LogoutButton";
import Shorting from "./Shorting";
import Filter from "./Filter";

export interface User {
  _id: string;
  username: string;
  email: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

const Page: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<User>>({});
  const [userInfoData, setUserInfoData] = useState<Partial<User>>({});
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [role, setRole] = useState<string>("");

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response: AxiosResponse<{ data: { users: User[] } }> =
          await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}`, {
            params: { role },
            withCredentials: true,
          });
          console.log(response.data.data.users);
          
        setUsers(response.data.data.users);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [role]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/getUserById`,
          { withCredentials: true }
        );
        setCurrentUser(res.data.userID);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      }
    };
    fetchCurrentUser();
  }, []);

  const getUserInfo = async (user: User) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/getAllInfo/${user._id}`,
        { withCredentials: true }
      );
      setUserInfoData(res.data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/deleteAll`,
        { withCredentials: true }
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

  const DeleteUser = async (user: User) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/deleteMe/${user._id}`,
        { withCredentials: true }
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

  const handleEditClick = (user: User) => {
    setEditId(user._id);
    setEditData(user);
  };

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
        { withCredentials: true }
      );
      toast({
        title: `${editData.username} updated successfully!`,
        description: res.data?.message || "User updated successfully 🎉",
      });
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === editId ? { ...u, ...editData } : u))
      );
      setEditId(null);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-red-600 text-center">Error: {error}</div>;

  return (
    <>
      <div className="overflow-x-auto p-4">
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-2xl text-center font-bold">Users</h1>
        </div>

        <div className="flex justify-end items-center pl-10 mb-3">
          <Filter />
          <Shorting role={role} setRole={setRole} />
          <Button onClick={handleDeleteAll}>
            <span className="flex justify-center items-center gap-2">
              Delete All <Trash2 size={18} />
            </span>
          </Button>
          <div className="ml-2">
            <LogoutButton />
          </div>
        </div>

        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 text-center">Role</th>
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
                  <td
                    className={`py-3 px-6 ${
                      currentUser === user._id ? "text-red-500 font-bold" : ""
                    }`}
                  >
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
                  <td
                    className={`py-3 px-6 ${
                      currentUser === user._id ? "text-red-500 font-bold" : ""
                    }`}
                  >
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
                  <td
                    className={`text-center ${
                      user.role === "admin"
                        ? "text-red-500 font-bold"
                        : user.role === "teacher"
                        ? "text-blue-500 font-semibold"
                        : ""
                    }`}
                  >
                    {user.role}
                  </td>

                  <td className="py-3 px-6">
                    <div className="flex justify-center items-center gap-4">
                      <Dialog>
                        <DialogTrigger>
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
                          color="blue"
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
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <BackButton />
    </>
  );
};

export default Page;
