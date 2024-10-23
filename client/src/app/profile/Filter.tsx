import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Filter = () => {
  return (
    <div className="mr-2">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Shorting" />
        </SelectTrigger>
        <SelectContent>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="new">Newest First</SelectItem>
            <SelectItem value="old">Oldest First</SelectItem>
            <SelectItem value="ascending">Username: (A to Z)</SelectItem>
            <SelectItem value="descending">Username: (Z to A)</SelectItem>
          </SelectContent>
        </SelectContent>
      </Select>
    </div>
  );
};
export default Filter;
