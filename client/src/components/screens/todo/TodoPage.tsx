// TodoPage.js
import TodoInput from "./TodoInput"; // Separate client component
import TodoTable from "./TodoTable"; // Server component
import TodoFilter from "./TodoFilter"; // Server component

const TodoPage = () => {
  return (
    <div className="flex flex-col py-20 items-center h-screen w-full px-10">
      <h1 className="text-center text-4xl font-bold">Todo</h1>

      {/* Add Todo Input and Button as a Client Component */}
      <div className="flex justify-center items-center w-1/2 gap-2 mt-3">
        <TodoInput /> {/* Client Component */}
      </div>

      <div className="flex items-center justify-end w-full">
        <TodoFilter />
      </div>

      <TodoTable />
    </div>
  );
};

export default TodoPage;
