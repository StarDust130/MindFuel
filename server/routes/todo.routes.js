import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodo,
  getTodoById,
} from "../controllers/todo.controller.js";
import { validateTodo } from "../middlewares/todo.middlewares.js";

const router = express.Router();

router.get("/", getAllTodo); //! GEt all 🤙

router.get("/:id", getTodoById); //! GEt by 🆔

router.post("/", validateTodo, createTodo); //! Create Todo 🐤

router.delete("/:id", validateTodo, deleteTodo); //! delete 🫦

router.patch("/:id", validateTodo, updateTodo); //! Update Todo ↕️

export default router;
