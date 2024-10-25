import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodo,
  getTodoById,
  toggleTodo,
  updateTodo,
} from "../controllers/todo.controller.js";
import { validateTodo } from "../middlewares/todo.middlewares.js";

const router = express.Router();

router.get("/", getAllTodo); //! GEt all 🤙

router.get("/:id", getTodoById); //! GEt by 🆔

router.post("/", validateTodo, createTodo); //! Create Todo 🐤

router.delete("/:id", deleteTodo); //! delete 🫦

router.patch("/:id", validateTodo, updateTodo); //! Update Todo ↕️

router.put("/:id", toggleTodo);

export default router;
