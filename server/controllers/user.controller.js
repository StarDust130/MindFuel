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
  const { id } = req.params; // Extract user ID from URL parameters
  const { username, email } = req.body; // Extract the fields to update from the request body

  // 1️⃣ Find the user by ID
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found.",
    });
  }

  // 2️⃣ Update the username if provided
  if (username) {
    user.username = username;
  }

  // 3️⃣ Update the email if provided and handle uniqueness check
  if (email) {
    // Check if the new email is already in use by another user
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== id) {
      return res.status(400).json({
        success: false,
        message: "This email is already in use by another user.",
      });
    }

    user.email = email;
  }

  // 4️⃣ Save the updated user
  await user.save();

  // 5️⃣ Send success response
  res.status(200).json({
    success: true,
    message: "User updated successfully! 🎉",
    data: { user },
  });
});

//! Delete User 🗑️
export const deleteUserById = catchAsync(async (req, res, next) => {
  // Get the user ID from URL parameters
  const { id } = req.params;

  // 1️⃣ Find and delete the user by their ID
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // 2️⃣ Send response (No content for delete - 204 status)
  res.status(200).json({
    success: true,
    message: "User deleted successfully! 🎉",
    data: null,
  });
});

//! Update password 🛠️
export const updatePassword = catchAsync(async (req, res, next) => {
  // 1️⃣ Extract necessary fields from request body
  const { currentPassword, newPassword, passwordConfirm } = req.body;

  // 2️⃣ Check if all required fields are provided
  if (!currentPassword || !newPassword || !passwordConfirm) {
    return next(
      new AppError(
        "Please provide current password, new password, and confirm password.",
        400
      )
    );
  }

  // 3️⃣ Check if newPassword and passwordConfirm match
  if (newPassword !== passwordConfirm) {
    return next(
      new AppError("New password and confirm password do not match.", 400)
    );
  }

  if (newPassword === currentPassword) {
    return next(
      new AppError("New password and current password should not be same.", 400)
    );
  }

  // 4️⃣ Get user from the database (including password for comparison)
  const user = await User.findById(req.user._id).select("+password");

  // 5️⃣ Verify if the current password is correct
  if (!(await user.comparePassword(currentPassword))) {
    return next(new AppError("Your current password is incorrect.", 401));
  }

  // 6️⃣ Update user password and save the updated user
  user.password = newPassword;
  await user.save();

  // 7️⃣ Respond with success message and the new token
  createSendToken(user, 200, res);
});

//! Delete all
export const deleteAll = catchAsync(async (req, res, next) => {
  // delete cookies
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  await User.deleteMany({});
  res.status(200).json({
    status: "success",
    message: "All users deleted successfully. 🍥",
  });
});

//! Get All User info 🧸
export const getAllInfo = catchAsync(async (req, res, next) => {
  try {
    // 1) Get user ID from request object
    const {id} = req.params;

    // Check if user ID is present
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID not provided",
      });
    }

    // 2) Fetch user info from database
    const user = await User.findById(id);

    // If user is not found, return error response
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3) Send user info in response
    return res.status(200).json({
      success: true,
      message: "User All Info 🪮",
      user, // Automatically includes the user's info without circular references
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error fetching user info:", error);

    // 4) Return error response
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching user info",
    });
  }
});
