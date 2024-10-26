import { Todo } from "../models/todo.modles.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

//! Get All Todo
export const getAllTodo = catchAsync(async (req, res) => {
  // 1) Get query parameters
  const { sort, limit = 10, page = 1, search } = req.query;

  // 2) Prepare the sort options
  const sortOptions = {
    new: { createdAt: -1 },
    old: { createdAt: 1 },
    ascending: { title: 1 },
    descending: { title: -1 },
  };

  // 3) Prepare the filter options
  const filterOptions = {};
  if (search) {
    filterOptions.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  // 4) Calculate pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // 5) Get todos with sorting, filtering, pagination, and case-insensitive collation
  const todos = await Todo.find(filterOptions)
    .sort(sortOptions[sort] || {})
    .skip(skip)
    .limit(parseInt(limit))
    .collation({ locale: "en", strength: 2 });

  // 6) Get total count for pagination
  const totalCount = await Todo.countDocuments(filterOptions);

  // 7) Response send
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
    return res.status(404).json({ message: "Todo not found 🤩"  });
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
