import {User} from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//! Register user 🗒️
const registerUser = async (req, res) => {
  // 1) Get user data from request body
  const { userName, userEmail, password, role } = req.body;

  // 2) Validate user data
  if (!userName || !userEmail || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all fields",
    });
  }

  // 3) Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ userEmail }, { userName }],
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User name or user email already exists",
    });
  }

  // 4) Hash the password
  const hashPassword = await bcrypt.hash(password, 10);

  // 5) Create a new user
  const newUser = new User({
    userName,
    userEmail,
    role,
    password: hashPassword,
  });

  await newUser.save();

  // 6) Send success response
  return res.status(201).json({
    success: true,
    message: "User registered successfully! 🥳",
    data: newUser,
  });
};

//! Login user 🗒️
const loginUser = async (req, res) => {
  // 1) Get user data from request body
  const { userEmail, password } = req.body;

  // 2) Validate user data
  if (!userEmail || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all fields",
    });
  }

  // 3) Check if user exists
  const checkUser = await User.findOne({ userEmail });

  if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // 4) Create a token
  const accessToken = jwt.sign(
    {
      _id: checkUser._id,
      userName: checkUser.userName,
      userEmail: checkUser.userEmail,
      role: checkUser.role,
    },
    "JWT_SECRET",
    { expiresIn: "120m" }
  );

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: {
      accessToken,
      user: {
        _id: checkUser._id,
        userName: checkUser.userName,
        userEmail: checkUser.userEmail,
        role: checkUser.role,
      },
    },
  });
};

export { registerUser, loginUser };
