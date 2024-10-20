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

  const { name, email } = req.body;

  // 2️⃣ Validate: Ensure name and email are provided
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Name and email cannot be empty.",
    });
  }

  // 3️⃣ Validate: Check if the new email is the same as the current one
  if (email === user.email) {
    return res.status(400).json({
      success: false,
      message: "New email cannot be the same as the current email.",
    });
  }

  // 4️⃣ Validate: Check if the email is already in use by another user
  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser.id !== req.user.id) {
    return res.status(400).json({
      success: false,
      message: "This email is already in use by another user.",
    });
  }

  // 5️⃣ Update user document with new name and email
  user.name = name;
  user.email = email;

  // 6️⃣ Save the updated user document
  await user.save();

  // 7️⃣ Send response
  res.status(200).json({
    success: true,
    message: "User updated successfully! 🎉",
    data: {
      user,
    },
  });
});

