import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TodoInputProps {
  todo: { title: string; description: string };
  setTodo: (todo: { title: string; description: string }) => void;
  handleAddTodo: () => void;
}

const TodoInput = ({ todo, setTodo, handleAddTodo }: TodoInputProps) => {
  return (
    <div className="flex flex-col md:flex-col gap-4 w-full md:max-w-2xl mx-auto p-4 rounded-lg">
      <h2 className="text-xl font-semibold text-center">Add Your Todo</h2>

      <div className="flex justify-center items-center gap-5 w-full">
        <Input
          placeholder="Add Title"
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        />
        <Input
          placeholder="Add Description"
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        />
      </div>
      <Button
        onClick={handleAddTodo}
        variant="default"
        className="rounded-lg transition duration-200 ease-in-out"
      >
        Add Todo
      </Button>
    </div>
  );
};

export default TodoInput;
