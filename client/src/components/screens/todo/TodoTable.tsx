import TodoCard from "./TodoCard";

interface TodoTableProps {
  todos: {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    isCompleted: boolean;
  }[];
  handleDeleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  handleEditTodo: (
    id: string,
    newTitle: string,
    newDescription: string
  ) => void; // Updated function signature
}

const TodoTable = ({
  todos,
  handleDeleteTodo,
  toggleTodo,
  handleEditTodo,
}: TodoTableProps) => {
  return (
    <div className="grid gap-6 mt-8 pb-10 px-6 sm:px-10 md:px-16 lg:px-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
      {todos.map((todo) => (
        <TodoCard
          key={todo._id}
          id={todo._id} // Pass the id prop
          title={todo.title}
          description={todo.description}
          createdAt={todo.createdAt}
          handleDeleteTodo={() => handleDeleteTodo(todo._id)}
          toggleTodo={() => toggleTodo(todo._id)}
          isCompleted={todo.isCompleted}
          handleEditTodo={handleEditTodo} // Pass the function directly
        />
      ))}
    </div>
  );
};

export default TodoTable;
