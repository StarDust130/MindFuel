"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TodoInput from "./TodoInput";
import TodoTable from "./TodoTable";
import TodoFilter from "./TodoFilter";
import { useToast } from "@/hooks/use-toast";

interface Todo {
  title: string;
  description: string;
}
interface Todos {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt?: string;
}

const TodoPage = () => {
  const [todo, setTodo] = useState<Todo>({
    title: "",
    description: "",
  });
  const [todos, setTodos] = useState<Todos[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<string>("");
  const { toast } = useToast();

  //! Fetch Todos on Component Mount Only 🧁
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_TODO_API_URL}?sort=${sort}`
        );
        setTodos(response.data.todos);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 429) {
          setError("Too many requests. Please try again later.");
        } else {
          setError("Error fetching todos.");
        }
      }
    };

    fetchTodos();
  }, [sort, todos.length]); // Fetch todos when sort or todos change

  //! Create Todo 🍰
  const handleAddTodo = async () => {
    if (todo.title.trim() === "") return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_TODO_API_URL}`,
        { title: todo.title, description: todo.description }
      );

      if (response.status === 201) {
        toast({
          title: "Todo Added 🎉",
          description: "Todo has been added successfully.",
        });
        setTodo({ title: "", description: "" });
        setTodos((prevTodos) => [...prevTodos, response.data.todo]);
      }
    } catch (error) {
      setError("Error adding todo.");
      toast({
        title: "Error Adding Todo 🚫",
        description: "An error occurred while adding the todo.",
        variant: "destructive",
      });
    }
  };

  //! Delete Todo 🍩
  const handleDeleteTodo = async (id: string) => {
    try {
      // Find the title of the todo being deleted
      const todoToDelete = todos.find((todo) => todo._id === id);

      await axios.delete(`${process.env.NEXT_PUBLIC_TODO_API_URL}/${id}`);

      toast({
        title: `${todoToDelete?.title || "Todo"} Deleted 🗑️`, // Use title of deleted todo
        description: "Todo has been deleted successfully.",
      });

      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      setError("Error deleting todo.");
      toast({
        title: "Error Deleting Todo 🚫",
        description: "An error occurred while deleting the todo.",
        variant: "destructive",
      });
    }
  };

  //! Toggle todo
  const toggleTodo = async (id: string) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_TODO_API_URL}/${id}`
      );

      const updatedTodo = response.data.todo;

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === updatedTodo._id ? updatedTodo : todo
        )
      );

      toast({
        title: "Todo Updated 🎉",
        description: "Todo has been updated successfully.",
      });
    } catch (error) {
      setError("Error to toggle todo.");
      toast({
        title: "Error to toggle it 🚫",
        description: "An error occurred while toggling the todo.",
        variant: "destructive",
      });
    }
  };

  //! Edit Todo 🍪
  const handleEditTodo = async (
    id: string,
    newTitle: string,
    newDescription: string
  ) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_TODO_API_URL}/${id}`,
        { title: newTitle, description: newDescription } // Use new title and description
      );

      const updatedTodo = response.data.todo;

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === updatedTodo._id ? updatedTodo : todo
        )
      );

      toast({
        title: "Todo Updated 🎉",
        description: "Todo has been updated successfully.",
      });
    } catch (error) {
      setError("Error updating todo.");
      console.log(error);

      toast({
        title: "Error Updating Todo 🚫",
        description: "An error occurred while updating the todo.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center py-20 h-screen w-full px-10 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Todo List</h1>
      {/* Display Error Message */}
      {error && <p className="text-red-500">{error}</p>}
      {/* Todo Input */}
      <div className="md:w-1/2 w-full mb-6">
        <TodoInput
          todo={todo}
          setTodo={setTodo}
          handleAddTodo={handleAddTodo}
        />
      </div>
      {/* Todo Filter */}
      <div className="w-full flex justify-end mb-4">
        <TodoFilter sort={sort} setSort={setSort} />
      </div>
      {/* Todo List */}
      <TodoTable
        todos={todos}
        handleDeleteTodo={handleDeleteTodo}
        toggleTodo={toggleTodo}
        handleEditTodo={handleEditTodo}
      />
    </div>
  );
};

export default TodoPage;
