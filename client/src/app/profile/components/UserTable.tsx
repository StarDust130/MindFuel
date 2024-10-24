import { Input } from "@/components/ui/input";
import { Actions } from "./Actions";
import { User } from "@/types/userTypes";

interface UserTableProps {
  users: User[];
  editId: string | null;
  editData: Partial<User>;
  loading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditClick: (user: User) => void;
  getUserInfo: (user: User) => void;
  updateUser: () => void;
  DeleteUser: (user: User) => void; // This accepts a User object
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  editId,
  editData,
  loading,
  onInputChange,
  handleEditClick,
  getUserInfo,
  updateUser,
  DeleteUser,
}) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Username</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 text-center">Role</th>
            <th className="py-3 px-6 text-center">Tools</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {loading ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-200 hover:bg-gray-100 transition duration-150 ease-in-out"
              >
                <td
                  className={`py-3 px-6 ${
                    editId === user._id ? "text-gray-500 font-bold" : ""
                  }`}
                >
                  {editId === user._id ? (
                    <Input
                      type="text"
                      name="username"
                      value={editData.username || ""}
                      onChange={onInputChange}
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td
                  className={`py-3 px-6 ${
                    editId === user._id ? "text-gray-500 font-bold" : ""
                  }`}
                >
                  {editId === user._id ? (
                    <Input
                      type="email"
                      name="email"
                      value={editData.email || ""}
                      onChange={onInputChange}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="text-center">
                  {user.role === "admin"
                    ? "Admin"
                    : user.role === "teacher"
                    ? "Teacher"
                    : "Student"}
                </td>
                <td className="py-3 px-6">
                  <Actions
                    user={user}
                    editId={editId}
                    getUserInfo={getUserInfo}
                    handleEditClick={handleEditClick}
                    updateUser={updateUser}
                    DeleteUser={DeleteUser}
                  />
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
  );
};
