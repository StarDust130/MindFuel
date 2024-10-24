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
  handleEditClick: (user: User) => void;
  updateUser: () => void;
  DeleteUser: (user: User) => void;
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
    <div className="flex justify-center items-center gap-4">
      <Dialog>
        <DialogTrigger>
          <Info color="orange" onClick={() => getUserInfo(user)} />
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
        <Pencil color="blue" onClick={() => handleEditClick(user)} />
      )}

      <Trash color="red" onClick={() => DeleteUser(user._id)} />
    </div>
  );
};
