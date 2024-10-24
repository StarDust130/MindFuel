import { Info, Pencil, Save, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserCard } from "@/components/elements/UserCard";
import { User } from "@/types/userTypes";

interface ActionsProps {
  user: User;
  editId: string | null;
  getUserInfo: (user: User) => void;
  handleEditClick: (user: User) => void; // Adjusted to be more specific
  updateUser: () => void; // Specified return type
  DeleteUser: (user: User) => void; // This accepts a User object
}

export const Actions: React.FC<ActionsProps> = ({
  user,
  editId,
  getUserInfo,
  handleEditClick,
  updateUser,
  DeleteUser,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Dialog>
        <DialogTrigger>
          <Info className="cursor-pointer" onClick={() => getUserInfo(user)} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <h2 className="text-lg font-semibold">{user.username}</h2>
          </DialogHeader>
          <DialogDescription>
            <UserCard user={user} />
          </DialogDescription>
        </DialogContent>
      </Dialog>
      {editId === user._id ? (
        <>
          <Save className="cursor-pointer" onClick={updateUser} />
        </>
      ) : (
        <>
          <Pencil
            className="cursor-pointer"
            onClick={() => handleEditClick(user)}
          />
          <Trash
            className="cursor-pointer"
            onClick={() => DeleteUser(user)} // Passing the user object directly
          />
        </>
      )}
    </div>
  );
};
