import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import sendEmail from "../utils/email.js";
import crypto from "crypto";

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

const signToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

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

//! Forgot password 🗝️
export const forgotPassword = catchAsync(async (req, res, next) => {
  if (!req.body.email) {
    return next(new AppError("Please provide an email address.", 400));
  }

  // 1) Get user based on posted email
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return next(new AppError("There is no user with that email address.", 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();

  // Save the user with the reset token and disable all validation
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

//! Reset password 🔑
export const resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password

  if (!user) {
    return next(new AppError("Token is invalid or has expired.", 400));
  }

  // 3) Update changedPasswordAt property for the user
  user.password = req.body.password;

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  // 4) Log the user in, send JWT

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "Password reset successful! 😆",
    token,
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

  // 4️⃣ Get user from the database (including password for comparison)
  const user = await User.findById(req.user._id).select("+password");

  // 5️⃣ Verify if the current password is correct
  if (!(await user.comparePassword(currentPassword))) {
    return next(new AppError("Your current password is incorrect.", 401));
  }

  // 6️⃣ Update user password and save the updated user
  user.password = newPassword;
  await user.save();

  // 7️⃣ Generate a new JWT token for the user
  const token = signToken(user._id);

  // 8️⃣ Respond with success message and the new token
  res.status(200).json({
    status: "success",
    message: "Password updated successfully! 😆",
    token,
  });
});

