"use client";
import TodoInput from "./TodoInput"; // Separate client component
import TodoTable from "./TodoTable"; // Server component
import TodoFilter from "./TodoFilter"; // Server component
import { useState } from "react";
import axios from "axios";

const TodoPage = () => {
  const [todo, setTodo] = useState({ title: "", description: "" });

  const handleAddTodo = async () => {
    if (todo.title.trim() === "") return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_TODO_API_URL}`,
        {
          title: todo.title,
          description: todo.description,
        }
      );
      console.log("response", response);

      if (response.status === 201) {
        setTodo({ title: "", description: "" }); // Clear input if successfully added
      } else {
        console.error("Failed to add todo");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
  return (
    <div className="flex flex-col py-20 items-center h-screen w-full px-10">
      <h1 className="text-center text-4xl font-bold">Todo</h1>

      {/* Add Todo Input and Button as a Client Component */}
      <div className="flex justify-center items-center w-1/2 gap-2 mt-3">
        <TodoInput
          todo={todo}
          setTodo={setTodo}
          handleAddTodo={handleAddTodo}
        />{" "}
        {/* Client Component */}
      </div>

      <div className="flex items-center justify-end w-full">
        <TodoFilter />
      </div>

      <TodoTable />
    </div>
  );
};

export default TodoPage;
