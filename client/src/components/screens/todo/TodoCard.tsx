import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckSquare, Edit3, Trash2 } from "lucide-react";

interface TodoCardProps {
  title: string;
  description: string;
  createdAt: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleComplete?: () => void;
  isCompleted?: boolean;
}

const TodoCard = ({
  title,
  description,
  createdAt,
  onEdit,
  onDelete,
  onToggleComplete,
  isCompleted,
}: TodoCardProps) => {
  
  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(createdAt));

  return (
    <Card className="border border-gray-200 shadow-lg hover:shadow-xl transition-shadow rounded-lg p-5 bg-white flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <CheckSquare
          onClick={onToggleComplete}
          className={`cursor-pointer transition duration-200 ease-in-out ${
            isCompleted ? "text-green-500" : "text-gray-300"
          }`}
        />
        <div className="flex-grow">
          <CardHeader>
            <CardTitle
              className={`text-lg font-semibold ${
                isCompleted ? "text-gray-400 line-through" : "text-gray-800"
              }`}
            >
              {title}
            </CardTitle>
            <CardDescription
              className={`text-sm ${
                isCompleted ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {description}
            </CardDescription>
          </CardHeader>
        </div>
        <div className="flex items-center gap-2">
          <Edit3
            onClick={onEdit}
            className="text-blue-500 cursor-pointer hover:text-blue-600 transition duration-200 ease-in-out"
          />
          <Trash2
            onClick={onDelete}
            className="text-red-500 cursor-pointer hover:text-red-600 transition duration-200 ease-in-out"
          />
        </div>
      </div>
      <CardFooter className="text-xs text-gray-400 mt-auto">
        Created on {formattedDate}
      </CardFooter>
    </Card>
  );
};

export default TodoCard;
