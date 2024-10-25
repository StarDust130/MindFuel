import express from "express";
import { createTodo, getAllTodo } from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/", getAllTodo);
router.post("/", createTodo);

export default router;
