import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ShortingProps {
  role: string;
  setRole: (role: string) => void;
}

const Shorting = ({ role, setRole }: ShortingProps) => {
  const handleRoleChange = (value: string) => {
    if(value === "all") value = "";
    setRole(value); // Update role based on selection
  };

  return (
    <div className="mr-2">
      <Select onValueChange={handleRoleChange} value={role}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="student">Student</SelectItem>
          <SelectItem value="teacher">Teacher</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Shorting;
