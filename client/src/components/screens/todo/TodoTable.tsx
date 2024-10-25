import TodoCard from "./TodoCard";

interface TodoTableProps {
  todos: { _id: string; title: string; description: string; createdAt: string }[];
}

const TodoTable = ({ todos }: TodoTableProps) => {
  return (
    <div className="grid gap-6 mt-8 pb-10 px-6 sm:px-10 md:px-16 lg:px-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
      {todos.map((todo) => (
        <TodoCard
          key={todo._id}
          title={todo.title}
          description={todo.description}
          createdAt={todo.createdAt}
        />
      ))}
    </div>
  );
};

export default TodoTable;
