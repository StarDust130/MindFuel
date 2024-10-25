import TodoCard from "./TodoCard";

interface TodoProps {
  todos: { title: string; description: string };
}

const TodoTable = ({ todos }: TodoProps) => {
  return (
    <div className="w-full mt-10 grid grid-col-3  border-gray-500 border-2 border-dotted">
      <TodoCard todos={todos} />
    </div>
  );
};
export default TodoTable;
