import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

//! Register user 🗒️
export const registerUser = catchAsync(async (req, res, next) => {
  // 1) Destructure request body
  const { username, email, password, role } = req.body;

  // 2) Validate required fields
  if (!username || !email || !password || !role) {
    return next(new AppError("Please fill in all fields.", 400));
  }

  // 3) Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    return next(new AppError("User already exists.", 400));
  }

  // 5) Create and save new user
  const newUser = await User.create({
    username,
    email,
    role,
    password,
  });

  // 6) Create JWT token with 5-second expiration
  const token = jwt.sign(
    {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser,
    }, // -> payload
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN } //  -> Token expires in 7 days
  );

  //  Send token in cookie
  res.cookie("accessToken", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days (7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    path: "/",
  });

  // 7) Return success response
  return res.status(201).json({
    success: true,
    message: "User registered successfully! 🥳",
    data: {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      accessToken: token,
    },
  });
});

//! Login user 🗒️
export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Validate required fields
  if (!email || !password) {
    return next(new AppError("Please provide email and password."));
  }

  // 2) Check if user exists
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppError("User not found.", 404));
  }

  // 3) Compare passwords
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return next(new AppError("Invalid email or password.", 401));
  }

  // 4) Create JWT token with 5-second expiration
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN } // Token expires in 7 days
  );

  res.cookie("accessToken", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days (7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    path: "/",
  });

  // 6) Return success response
  return res.status(200).json({
    success: true,
    message: "Logged in successfully.",
    data: {
      accessToken: token,
    },
  });
});

//! Logout user 🗒️
export const logoutUser = catchAsync(async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
});



//! Protect routes 🛝
export const protectRoute = catchAsync(async (req, res, next) => {
  // 1) Check if token exists
  const token = req.cookies.accessToken;
  if (!token) {
    return next(new AppError("You are not logged in. Please log in to get access.", 401));
  }

  // 2) Verify token
  const decoded = jwt.verify(token, JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded._id);
  if (!currentUser) {
    return next(new AppError("The user belonging to this token does no longer exist.", 401));
  }

  // 4) Grant access to protected route
  req.user = currentUser;
  next();
});