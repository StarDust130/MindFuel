import mongoose from "mongoose";

// Todo schema with improved validation and indexing
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
      minlength: [2, "Title must be at least 2 characters"],
      maxlength: [50, "Title must not exceed 50 characters"],
      index: true, // Index for optimized search
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description must not exceed 200 characters"],
      default: "", // Default empty string if no description
    },
    isCompleted: {
      type: Boolean,
      default: false, // Track completion status
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
