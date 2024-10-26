import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TodoFilter = ({
  sort,
  setSort,
}: {
  sort: string;
  setSort: (value: string) => void;
}) => {
  const filterHandler = (value: string) => {
    if (value === "all") {
      setSort("");
    } else {
      setSort(value);
    }
  };
  return (
    <div className="flex items-center justify-between gap-4">
      <Input type="text" placeholder="Search" />  
      <div className="mr-2">
        <Select value={sort} onValueChange={filterHandler}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
            {/* Show the selected option */}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="new">Newest First</SelectItem>
            <SelectItem value="old">Oldest First</SelectItem>
            <SelectItem value="ascending">Todos: (A to Z)</SelectItem>
            <SelectItem value="descending">Todos: (Z to A)</SelectItem>
            <SelectItem value="completed">Completed First</SelectItem>
            <SelectItem value="notCompleted">Not Completed First</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
export default TodoFilter;
