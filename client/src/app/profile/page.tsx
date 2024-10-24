"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import BackButton from "@/components/elements/BackButton";
import LogoutButton from "@/components/elements/Header/LogoutButton";
import Filter from "./components/Filter";
import Shorting from "./components/Shorting";
import { UserTable } from "./components/UserTable";
import { User } from "@/types/userTypes";

const Page: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<User>>({});
  const [role, setRole] = useState<string>("");

  const { toast } = useToast();
  const router = useRouter();

  //! Fetch all users on initial render
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_ADMIN_API_URL}`,
          {
            params: { role },
            withCredentials: true,
          }
        );
        setUsers(response.data.data.users);
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [role]);

  //! Delete all users
  const handleDeleteAll = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/deleteAll`, {
        withCredentials: true,
      });
      router.push("/sign-up");
      toast({
        title: "All Users Deleted",
        description: "All users deleted successfully 🔪",
      });
      setUsers([]);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  //! Delete a single user
  const handleDeleteUser = async (user: User) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/deleteMe/${user._id}`,
        {
          withCredentials: true,
        }
      );
      setUsers(users.filter((u) => u._id !== user._id));
      toast({
        title: "User Deleted",
        description: "User deleted successfully 🔪",
      });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  //! Update user
  const updateUser = async () => {
    if (editId) {
      try {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/updateMe/${editId}`,
          editData,
          { withCredentials: true }
        );
        toast({
          title: "User Updated",
          description: "User updated successfully ✅",
        });
        // Reset edit state after updating
        setEditId(null);
        setEditData({});
        // Re-fetch users to reflect changes
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_ADMIN_API_URL}`,
          {
            params: { role },
            withCredentials: true,
          }
        );
        setUsers(response.data.data.users);
      } catch (err: any) {
        console.error(err.message);
      }
    }
  };

  //! Handle edit click
  const handleEditClick = (user: User) => {
    setEditId(user._id); // Set the ID of the user being edited
    setEditData(user); // Set the user data for editing
  };

  return (
    <>
      <div className="flex justify-center items-center mb-4 mt-2">
        <h1 className="text-2xl text-center font-bold">Users</h1>
      </div>

      <div className="flex justify-end gap-3 mr-5 items-center pl-10 mb-3">
        <Filter />
        <Shorting role={role} setRole={setRole} />
        <Button size={"sm"} onClick={handleDeleteAll}>
          <span className="flex justify-center items-center gap-2">
            Delete All
          </span>
        </Button>
        <LogoutButton size={"sm"} />
      </div>

      <UserTable
        users={users}
        loading={loading}
        editId={editId}
        editData={editData}
        onInputChange={(e) =>
          setEditData({ ...editData, [e.target.name]: e.target.value })
        }
        handleEditClick={handleEditClick}
        getUserInfo={(user) => console.log("Get user info for", user)}
        updateUser={updateUser}
        DeleteUser={handleDeleteUser} // Corrected prop name
      />

      <BackButton />
    </>
  );
};

export default Page;
