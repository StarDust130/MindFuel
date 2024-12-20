interface UserProps {
  _id: string;
  username: string;
  email: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  passwordChangedAt?: string;
}
import { User, Mail, Calendar, ShieldAlert } from "lucide-react"; // Importing icons from Lucide

export const UserCard = ({ user }: { user: UserProps }) => {
  return (
    <div className="w-full h-full  p-6 ">
      <div className="flex items-center space-x-4">
        <User className="w-12 h-12 text-blue-500" />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {user.username}
          </h2>
          <p className="text-sm text-gray-500">Role: {user.role}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-700">
          <Mail className="w-5 h-5 mr-2 text-gray-500" />
          <span>{user.email}</span>
        </div>

        <div className="flex items-center text-gray-700">
          <Calendar className="w-5 h-5 mr-2 text-gray-500" />
          <span>
            Joined:{" "}
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "N/A"}
          </span>
        </div>

        <div className="flex items-center text-gray-700">
          <ShieldAlert className="w-5 h-5 mr-2 text-gray-500" />
          <span>
            Password changed:{" "}
            {user.passwordChangedAt
              ? new Date(user.passwordChangedAt).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};
