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
    message: "All todo get Sucessfully 🥳",
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
    message: "Todo created Sucessfully 👺",
    todo,
  });
});

//! Get todo by ID
export const getTodoById = catchAsync(async (req, res, next) => {
  // 1) Get id from params
  const { id } = req.params;

  // 2) Find Todo
  const todo = await Todo.findById(id);

  if (!todo) {
    return next(new AppError("Todo not found", 404));
  }

  // 3) Send resposne
  res.status(201).json({
    message: "Todo get Sucessfully 🫀",
    todo,
  });
});

//! Delete Todo
export const deleteTodo = catchAsync(async (req, res, next) => {
  // 1) Get id from params
  const { id } = req.params;

  // 2) Find Todo
  const todo = await Todo.findByIdAndDelete(id);

  if (!todo) {
    return next(new AppError("Todo not found", 404));
  }

  // 3) Send resposne
  res.status(201).json({
    message: "Todo deleted Sucessfully 🫀",
  });
});

//! Update Todo 📝
export const updateTodo = catchAsync(async (req, res, next) => {
  // 1️⃣ Get ID from request parameters
  const { id } = req.params;

  // 2️⃣ Extract fields to update from request body
  const { title, description } = req.body;

  // 3️⃣ Find and update the todo (use PATCH for partial update)
  const todo = await Todo.findByIdAndUpdate(
    id,
    { title, description },
    {
      new: true, // Return the updated document
      runValidators: true, // Validate updated fields
    }
  );

  // 4️⃣ Check if todo was found and updated
  if (!todo) {
    return next(new AppError("Todo not found", 404));
  }

  // 5️⃣ Send response with updated todo
  res.status(200).json({
    message: "Todo updated successfully ✨",
    todo,
  });
});

//! Toggle Todo 🐕‍🦺
export const toggleTodo = catchAsync(async (req, res, next) => {
  // 1) Find the todo and toggle its isCompleted status
  const todo = await User.findById(req.params.id);

  // If the todo does not exist, return an error
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  // Toggle the isCompleted status
  todo.isCompleted = !todo.isCompleted;
  await todo.save();

  // 2) Send the response with the updated todo
  res.status(200).json({
    message: "Todo toggled successfully",
    todo, // Include the updated todo
  });
});

