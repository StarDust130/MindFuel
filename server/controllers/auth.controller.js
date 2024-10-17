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

  

  // 5) Create and save new user
  const newUser = await User.create({
    username,
    email,
    role,
    password,
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

  // 4) Create JWT token with 5-second expiration
 const token = jwt.sign(
   {
     _id: user._id,
     username: user.username,
     email: user.email,
     role: user.role,
   },
   JWT_SECRET,
   { expiresIn: "7d" } // Token expires in 7 days
 );

 res.cookie("accessToken", token, {
   httpOnly: true,
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
