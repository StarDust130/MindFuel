import { User } from "../models/user.models.js";
import { catchAsync } from "../utils/catchAsync.js";

//! Get All users
export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    data: {
      length: users.length,
      users,
    },
  });
});

//! Update user data 🛠️
export const updateMe = catchAsync(async (req, res, next) => {
  // 1️⃣ Get the user from the collection
  const user = await User.findById(req.user.id);

  const { username, email } = req.body;

  // 2️⃣ Validate: If both fields are empty, return an error
  if (!username && !email) {
    return res.status(400).json({
      success: false,
      message:
        "Please provide at least one field to update (username or email).",
    });
  }

  // 3️⃣ Update: If username is provided, update username
  if (username) {
    user.username = username;
  }

  // 4️⃣ Update: If email is provided, check for uniqueness
  if (email) {
    // Prevent user from updating to the same email
    if (email === user.email) {
      return res.status(400).json({
        success: false,
        message: "New email cannot be the same as the current email.",
      });
    }

    // Check if the email is already in use by another user
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.id !== req.user.id) {
      return res.status(400).json({
        success: false,
        message: "This email is already in use by another user.",
      });
    }

    user.email = email;
  }

  // 5️⃣ Save the updated user document
  await user.save();

  // 6️⃣ Send response
  res.status(200).json({
    success: true,
    message: "User updated successfully! 🎉",
    data: {
      user,
    },
  });
});

//! Delete User 🗑️
export const deleteMe = catchAsync(async (req, res, next) => {
  // 1️⃣ Get the user from the collection
  const user = await User.findByIdAndUpdate(req.user.id, (user.active = false));

  // 2️⃣ Save the updated user document
  await user.save();

  // 3️⃣ Send response
  res.status(204).json({
    success: true,
    message: "User deleted successfully! 🎉",
    data: null,
  });
});

