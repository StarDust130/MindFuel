import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync.js";

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

//! Register user 🗒️
export const registerUser = catchAsync(async (req, res) => {
  // 1) Destructure request body
  const { username, email, password, role } = req.body;

  // 2) Validate required fields
  if (!username || !email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all fields.",
    });
  }

  // 3) Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Username or email already exists.",
    });
  }

  // 4) Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 5) Create and save new user
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
  });

  // 6) Return success response
  return res.status(201).json({
    success: true,
    message: "User registered successfully! 🥳",
    data: {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

//! Login user 🗒️
export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // 1) Validate required fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all fields.",
    });
  }

  // 2) Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials.",
    });
  }

  // 3) Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials.",
    });
  }

  // 4) Create JWT token
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  // 5) Set JWT as HttpOnly cookie
 res.cookie("accessToken", token, {
   httpOnly: false, // Set to false to allow access via JavaScript
   secure: process.env.NODE_ENV === "production", // Only use secure in production
   sameSite: "Lax", // Or adjust based on your cross-site needs
   maxAge: 3600 * 1000, // 1 hour expiration
   path: "/", // Make the cookie accessible on all routes
 });


 

  // 6) Return success response
  return res.status(200).json({
    success: true,
    message: "Logged in successfully.",
    data: {
      accesToken: token,
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
