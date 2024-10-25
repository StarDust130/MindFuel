import { Todo } from "../models/todo.modles.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

//! Get All Todo
export const getAllTodo = catchAsync(async (req, res) => {
  // 1) Get all todo
  const todos = await Todo.find({});

  // 2) Response send
  res.status(201).json({
    length: todos.length,
    message: "All users get Sucessfully 🥳",
    todos,
  });
});

//! Create todo
export const createTodo = catchAsync(async (req, res, next) => {
  // 1) Get data from req
  const { title, description } = req.body;

  if (!title) {
    return next(new AppError("Please provide an title", 400));
  }

  // 2) Save it DB
  const todo = await Todo.create({ title, description });

  // 3) Send resposne
  res.status(201).json({
    message: "User created Sucessfully 👺",
    todo,
  });
});
