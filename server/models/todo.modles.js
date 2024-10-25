import mongoose from "mongoose";

// title , desc ,

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
      minlength: [2, "Title must be at least 2 characters"],
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
