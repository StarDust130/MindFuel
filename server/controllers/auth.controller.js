import { User } from "../models/user.models.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import sendEmail from "../utils/email.js";
import crypto from "crypto";
import { createSendToken } from "../utils/extras.js";
import jwt from "jsonwebtoken";

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

  // 6)  Send token in cookie and success response
  createSendToken(newUser, "User Register Successfully 🥳", 200, res);
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
    return next(new AppError("User not find.", 404));
  }

  // 3) Compare passwords
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return next(new AppError("Invalid email or password.", 401));
  }

  // 4)  Send token in cookie and success response
  createSendToken(user, "User Login Successfully 🥳", 200, res);
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

  const resetLink = `${process.env.CLIENT_URL}/resetPassword/${resetToken}`;

  console.log("resetLink:", resetLink);

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      resetLink,
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

// //! Reset password 🔑
export const resetPassword = catchAsync(async (req, res, next) => {
  console.log(
    "Received request to reset password for token:",
    req.params.token
  );
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
  createSendToken(user, 200, res);
});
