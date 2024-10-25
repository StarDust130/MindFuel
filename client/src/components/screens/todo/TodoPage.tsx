// TodoPage.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TodoInput from "./TodoInput";
import TodoTable from "./TodoTable";
import TodoFilter from "./TodoFilter";

// Updated Todo interface with `_id` and other properties
interface Todo {
  _id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const TodoPage = () => {
  const [todo, setTodo] = useState<Omit<Todo, "_id">>({
    title: "",
    description: "",
  });
  const [todos, setTodos] = useState<Todo[]>([]);

  //! Fetch Todos on Component Mount Only
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_TODO_API_URL}`
        );
        setTodos(response.data.todos);
        console.log("Fetched todos:", response.data.todos);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 429) {
          console.error("Too many requests. Please try again later.");
        } else {
          console.error("Error fetching todos:", error);
        }
      }
    };

    fetchTodos();
  }, []); // Only run on mount

  //! Create Todo
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

      if (response.status === 201) {
        setTodo({ title: "", description: "" }); // Clear input after adding
        // Optimistically update the todos list
        setTodos((prevTodos) => [...prevTodos, response.data.todo]);
      } else {
        console.error("Failed to add todo");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div className="flex flex-col items-center py-20 h-screen w-full px-10 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Todo List</h1>

      {/* Todo Input */}
      <div className="md:w-1/2 w-full  mb-6">
        <TodoInput
          todo={todo}
          setTodo={setTodo}
          handleAddTodo={handleAddTodo}
        />
      </div>

      {/* Todo Filter */}
      <div className="w-full flex justify-end mb-4">
        <TodoFilter />
      </div>

      {/* Todo List */}
      <TodoTable todos={todos} />
    </div>
  );
};

export default TodoPage;
