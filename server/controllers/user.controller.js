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
  // 1️⃣ Set user's active status to false (soft delete)
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { active: false },  // Correctly updating the 'active' field
    { new: true, runValidators: true }  // Options: return updated user, and validate
  );

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // 2️⃣ Send response (No content for delete - 204 status)
  res.status(204).json({
    success: true,
    message: "User deactivated successfully! 🎉",
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
  await User.deleteMany({});
  res.status(200).json({
    status: "success",
    message: "All users deleted successfully.",
  });
});