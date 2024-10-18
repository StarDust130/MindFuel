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
    }
  });
});
