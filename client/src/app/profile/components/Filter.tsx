import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterProps {
  short: string;
  setShort: (short: string) => void;
}

const Filter = ({ short, setShort }: FilterProps) => {
  const handleShorting = (value: string) => {
    setShort(value); // Set the selected value to display in the Select trigger

    // Apply sorting logic
    let sortValue = ""; // default: no sorting
    switch (value) {
      case "new":
        sortValue = "-createdAt"; // Newest first
        break;
      case "old":
        sortValue = "createdAt"; // Oldest first
        break;
      case "ascending":
        sortValue = "username"; // A-Z by username
        break;
      case "descending":
        sortValue = "-username"; // Z-A by username
        break;
      default:
        sortValue = ""; // All users or no sorting
        break;
    }

    // You can handle the actual sort logic here or wherever needed
  };

  return (
    <div className="mr-2">
      <Select value={short} onValueChange={handleShorting}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Shorting" />
          {/* Show the selected option */}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Users</SelectItem>
          <SelectItem value="new">Newest First</SelectItem>
          <SelectItem value="old">Oldest First</SelectItem>
          <SelectItem value="ascending">Username: (A to Z)</SelectItem>
          <SelectItem value="descending">Username: (Z to A)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
