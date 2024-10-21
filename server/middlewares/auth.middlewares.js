import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

//! Protect routes 🛝
export const protectRoute = catchAsync(async (req, res, next) => {
  // 1) Check if token exists
  const token = req.cookies.accessToken || req.headers.authorization;

  if (!token) {
    return next(
      new AppError("You are not logged in. Please log in to get access.", 401)
    );
  }

  // 2) Verify token
  const decoded = jwt.verify(token, JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded._id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued.
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // 5) Grant access to protected route
  req.user = currentUser;
  next();
});

//! Restrict routes 🚫
// Define user roles
export const Roles = Object.freeze({
  STUDENT: "student",
  TEACHER: "teacher",
  ADMIN: "admin",
});

export const restrictRoute = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if user role is allowed to access route
    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action.", 403)
      );
    }
    next();
  };
};