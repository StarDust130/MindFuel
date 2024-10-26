import { Todo } from "../models/todo.modles.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

//! Get All Todo
export const getAllTodo = catchAsync(async (req, res) => {
  // 1) 🎣 Fishing for query params from the request
  const { sort, limit = 10, page = 1, search, isCompleted } = req.query;

  // 2) 🔀 Setting up our sorting magic hat
  const sortOptions = {
    new: { createdAt: -1 }, // 🆕 Newest first
    old: { createdAt: 1 }, // 👴 Oldest first
    ascending: { title: 1 }, // 🔤 A to Z
    descending: { title: -1 }, // 🔠 Z to A
    completed: { isCompleted: -1, createdAt: -1 }, // ✅ Completed todos first, then by newest
    notCompleted: { isCompleted: 1, createdAt: -1 }, // ❌ Not completed todos first, then by newest
  };

  // 3) 🕵️‍♀️ Detective work: setting up our search and filter clues
  const filterOptions = {};
  if (search) {
    // 🔍 Looking for matching title or description
    filterOptions.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }
  if (isCompleted !== undefined) {
    // ✅ or ❌ Checking if todo is done or not
    filterOptions.isCompleted = isCompleted === "true";
  }

  // 4) 🦘 Calculating our skip-jump for pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // 5) 🎣 Reeling in our todos from the database ocean
  const todos = await Todo.find(filterOptions)
    .sort(
      sort === "completed" || sort === "notCompleted" ? sortOptions[sort] : sortOptions[sort] || {}
    )
    .skip(skip)
    .limit(parseInt(limit))
    .collation({ locale: "en", strength: 2 });

  // 6) 🧮 Counting all our todo fishes in the sea
  const totalCount = await Todo.countDocuments(filterOptions);

  // 7) 📦 Packing up our response in a nice box with a bow
  res.status(200).json({
    totalCount,
    currentPage: parseInt(page),
    totalPages: Math.ceil(totalCount / parseInt(limit)),
    message: "Todos retrieved successfully 🥳",
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
    todo, // Send the updated todo
  });
});

//! Toggle Todo 🐕‍🦺
export const toggleTodo = catchAsync(async (req, res, next) => {
  // 1) Find the todo and toggle its isCompleted status
  const todo = await Todo.findById(req.params.id);

  console.log("todo 🐼", todo);

  // If the todo does not exist, return an error
  if (!todo) {
    return res.status(404).json({ message: "Todo not found 🤩" });
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
