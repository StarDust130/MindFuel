import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String, // Use String (capitalized) for data types
      required: [true, "Username is required"],
      trim: true,
      minlength: [2, "Username must be at least 2 characters"],
      maxlength: [50, "Username can't exceed 50 characters"],
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true, // Convert email to lowercase
      unique: true, // Ensure email is unique
      match: [/.+\@.+\..+/, "Please enter a valid email address"], // Email format validation
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
      trim: true,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }); // Create an index on email for faster lookup


//! HAsh password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//! Compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
