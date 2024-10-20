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
  // 1) Get user from collection
  const user = await User.findById(req.user.id);

  // 2) Update user document
  user.name = req.body.name;
  user.email = req.body.email;
  await user.save();

  // 3) Send response

  res.status(200).json({
    success: true,
    data: {
      user,
    },
  });
});
