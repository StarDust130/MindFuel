import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
  username: {
    type: "string",
    reqired: [true, "Username is Required"],
    trim: true,
  },
  email: {
    type: "string",
    reqired: [true, "Email is Required"],
    trim: true,
  },
  password: {
    type: "string",
    trim: true,
  },
  role: {
    type: "string",
    trim: true,
  },
});

export const User = mongoose.model("User", userSchema);
