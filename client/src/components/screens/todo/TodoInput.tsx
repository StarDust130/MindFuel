// TodoInput.js
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const TodoInput = () => {
  const [todo, setTodo] = useState("");

  const handleAddTodo = async () => {
    if (todo.trim() === "") return;

    try {
      const response = await axios.post( `${process.env.NEXT_PUBLIC_TODO_API_URL}`, {
        title: todo,
      });
      if (response.status === 201) {
        setTodo(""); // Clear input if successfully added
      } else {
        console.error("Failed to add todo");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <>
      <Input
        placeholder="Add Todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <Button onClick={handleAddTodo} variant={"default"}>
        Add Todo
      </Button>
    </>
  );
};

export default TodoInput;
