import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String, // Use String (capitalized) for data types
      required: [true, "Username is required"],
      trim: true,
      minlength: [2, "Username must be at least 2 characters"],
      maxlength: [50, "Username can't exceed 50 characters"],
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true, // Convert email to lowercase
      unique: true, // Ensure email is unique
      match: [/.+\@.+\..+/, "Please enter a valid email address"], // Email format validation
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      trim: true,
      select: false, // Prevent sending password to client
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
      trim: true,
    },
    profilePicture: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }); // Create an index on email for faster lookup

//! Hash password before saving to DB
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  // Hash the password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

//! Update passwordChangedAt property when password is modified
userSchema.pre("save", function (next) {
  // Only update passwordChangedAt if the password was modified
  if (!this.isModified("password") || this.isNew) return next();

  // Subtract 1 second to ensure the token is created after the password was changed
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//! Compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//! changed Password After middleware
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    // True means changed password after token was issued (i.e. user logged in)  ex: 100 < 200 => true => password changed after token was issued
    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

//! Create password reset token
userSchema.methods.createPasswordResetToken = function () {
  // Generate random token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash token and save to DB
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    console.log({ resetToken }, this.passwordResetToken);
    

  // Set token expiration time
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes

  return resetToken;
};

export const User = mongoose.model("User", userSchema);
