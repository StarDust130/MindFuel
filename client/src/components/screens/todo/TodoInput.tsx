import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TodoInputProps {
  todo: { title: string; description: string };
  setTodo: (todo: { title: string; description: string }) => void;
  handleAddTodo: () => void;
}

const TodoInput = ({ todo, setTodo, handleAddTodo }: TodoInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Input
        placeholder="Add Title"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        className="border border-gray-300 p-2 rounded"
      />
      <Input
        placeholder="Add Description"
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        className="border border-gray-300 p-2 rounded"
      />
      <Button
        onClick={handleAddTodo}
        variant="default"
        className="mt-2 "
      >
        Add Todo
      </Button>
    </div>
  );
};

export default TodoInput;
