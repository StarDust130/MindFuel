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
export const loginUser = catchAsync (async (req, res) => {
  // 1) Destructure request body
  const { email, password } = req.body;

  // 2) Validate required fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all fields.",
    });
  }

  // 3) Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials.",
    });
  }

  // 4) Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials.",
    });
  }

  // 5) Create JWT token
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "2h" } // Adjust the expiry time as needed
  );

  // 6) Return success response with token
  return res.status(200).json({
    success: true,
    message: "Logged in successfully.",
    data: {
      accessToken: token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    },
  });
});

//! Logout user 🗒️
export const logoutUser = catchAsync (async (req, res) => {
  // Clear the accessToken cookie
  res.clearCookie("accessToken");

  // Send a success response
  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
});
