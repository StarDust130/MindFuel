import TodoCard from "./TodoCard";

interface TodoTableProps {
  todos: { _id: string; title: string; description: string }[];
}

const TodoTable = ({ todos }: TodoTableProps) => {
  return (
    <div className="grid gap-4 mt-6 pb-10  px-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
      {todos.map((todo) => (
        <TodoCard
          key={todo._id}
          title={todo.title}
          description={todo.description}
        />
      ))}
    </div>
  );
};

export default TodoTable;
