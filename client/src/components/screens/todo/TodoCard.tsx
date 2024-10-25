import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckSquare, Edit3, RotateCcw, Trash2 } from "lucide-react";

interface TodoCardProps {
  id: string; // Added id prop
  title: string;
  description: string;
  createdAt: string;
  handleDeleteTodo?: () => void;
  isCompleted?: boolean;
  toggleTodo?: () => void;
  handleEditTodo: (
    id: string,
    newTitle: string,
    newDescription: string
  ) => void; // Updated prop type
}

const TodoCard = ({
  id, // Added id
  title,
  description,
  createdAt,
  handleEditTodo,
  handleDeleteTodo,
  toggleTodo,
  isCompleted,
}: TodoCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(createdAt));

  const handleSave = () => {
    handleEditTodo(id, newTitle, newDescription); // Pass id and new values
    setIsEditing(false);
  };

  return (
    <Card className="border border-gray-200 shadow-lg hover:shadow-xl transition-shadow rounded-lg p-5 bg-white flex flex-col gap-4">
      <div className="flex items-start gap-4">
        {isCompleted ? (
          <RotateCcw
            onClick={toggleTodo}
            className={`cursor-pointer transition duration-200 ease-in-out`}
          />
        ) : (
          <CheckSquare
            onClick={toggleTodo}
            className={`cursor-pointer transition duration-200 ease-in-out`}
          />
        )}

        <div className="flex-grow">
          <CardHeader>
            {isEditing ? (
              <div className="flex flex-col">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="border-b border-gray-400 focus:outline-none focus:border-blue-500"
                />
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="border-b border-gray-400 focus:outline-none focus:border-blue-500 mt-1"
                  rows={2}
                />
              </div>
            ) : (
              <>
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
              </>
            )}
          </CardHeader>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="text-green-500 hover:text-green-600 transition duration-200 ease-in-out"
            >
              Save
            </button>
          ) : (
            <Edit3
              onClick={() => setIsEditing(true)}
              className="text-blue-500 cursor-pointer hover:text-blue-600 transition duration-200 ease-in-out"
            />
          )}
          <Trash2
            onClick={handleDeleteTodo}
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
