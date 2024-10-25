import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckSquare, Edit3, RotateCcw, Save, Trash2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TodoCardProps {
  id: string;
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
  ) => void;
}

const TodoCard = ({
  id,
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
    if (newTitle.trim() === "" || newDescription.trim() === "") {
      alert("Title and description cannot be empty.");
      return;
    }

    handleEditTodo(id, newTitle, newDescription);
    setIsEditing(false);
  };

  return (
    <Card className="border border-gray-200 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform rounded-lg p-5 bg-white flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {isCompleted ? (
          <RotateCcw
            onClick={toggleTodo}
            className="cursor-pointer text-gray-400 hover:text-gray-600 transition-all duration-200 ease-in-out transform hover:scale-110"
          />
        ) : (
          <CheckSquare
            onClick={toggleTodo}
            className="cursor-pointer text-green-500 hover:text-green-600 transition-all duration-200 ease-in-out transform hover:scale-110"
          />
        )}

        <div className="flex-grow w-full">
          <CardHeader>
            {isEditing ? (
              <div className="flex flex-col w-full gap-2 mx-3">
                <Input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-lg font-semibold p-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Title"
                />
                <Input
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Description"
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
            <div className="flex justify-center items-center gap-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSave}
                className="text-green-500 hover:text-green-600 transition-transform transform duration-200 hover:scale-110"
              >
                <Save />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsEditing(false)}
                className="text-red-500 hover:text-red-600 transition-transform transform duration-200 hover:scale-110"
              >
                <X />
              </Button>
            </div>
          ) : (
            <>
              <Edit3
                onClick={() => setIsEditing(true)}
                className="text-blue-500 cursor-pointer hover:text-blue-600 transition-transform transform duration-200 hover:scale-110"
              />
              <Trash2
                onClick={handleDeleteTodo}
                className="text-red-500 cursor-pointer hover:text-red-600 transition-transform transform duration-200 hover:scale-110"
              />
            </>
          )}
        </div>
      </div>
      <CardFooter className="text-xs text-gray-400 mt-auto">
        Created on {formattedDate}
      </CardFooter>
    </Card>
  );
};

export default TodoCard;
