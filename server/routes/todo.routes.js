import express from "express";
import { createTodo, getAllTodo } from "../controllers/todo.controller.js";
import { validateTodo } from "../middlewares/todo.middlewares.js";

const router = express.Router();

router.get("/", getAllTodo);
router.post("/", validateTodo, createTodo);

export default router;
