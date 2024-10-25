"use client";
import TodoInput from "./TodoInput"; // Separate client component
import TodoTable from "./TodoTable"; // Server component
import TodoFilter from "./TodoFilter"; // Server component
import { useEffect, useState } from "react";
import axios from "axios";

//  "isCompleted": false,
//             "_id": "671b3de927052fe52aea6910",
//             "title": "Demon Slayer is best",
//             "description": "Hello BOi from Lord babu",
//             "createdAt": "2024-10-25T06:42:49.184Z",
//             "updatedAt": "2024-10-25T07:21:58.853Z",
//             "__v": 0
// this my todo object that i get from the server

const TodoPage = () => {
  const [todo, setTodo] = useState({ title: "", description: "" });
  const [todos, setTodos] = useState([]);

  //! Get Todos 🍦
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_TODO_API_URL}`
        );
        setTodos(response.data.todos);
        console.log(" Todo response", response.data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [todo , todos]);

  //! Create Todo 🍨
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

      <TodoTable todos={todos} />
    </div>
  );
};

export default TodoPage;
