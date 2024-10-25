import { Todo } from "../models/todo.modles.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

//! Get All Todo
export const getAllTodo = catchAsync(async (req, res) => {
  // 1) Get all todo
  const todos = await Todo.find({});

  // 2) Response send
  res.status(200).json({
    length: todos.length,
    message: "All users get Sucessfully 🥳",
    todos,
  });
});

//! Create todo
export const createTodo = catchAsync(async (req, res, next) => {
  // 1️) Get data from req
  const { title, description } = req.body;


  // 2) Save it DB
  const todo = await Todo.create({ title, description });

  // 3) Send resposne
  res.status(201).json({
    message: "User created Sucessfully 👺",
    todo,
  });
});

//! Get todo by ID
export const getTodoById = catchAsync(async (req, res, next) => {

})
