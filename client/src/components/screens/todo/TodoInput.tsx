import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TodoInputProps {
  todo: { title: string; description: string };
  setTodo: (todo: { title: string; description: string }) => void;
  handleAddTodo: () => void;
}

const TodoInput = ({ todo, setTodo, handleAddTodo }: TodoInputProps) => {
  return (
    <>
      <Input
        placeholder="Add Title"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <Input
        placeholder="Add Description"
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <Button onClick={handleAddTodo} variant={"default"}>
        Add Todo
      </Button>
    </>
  );
};

export default TodoInput;
