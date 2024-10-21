import jwt from "jsonwebtoken";

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

//! Sign JWT Token with user ID : mean we are signing the token with the user ID
export const signToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

//! Send JWT Token in cookie and success response
export const createSendToken = (user, message, statusCode, res) => {
  const token = signToken(user._id);

  res.cookie("accessToken", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days (7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    path: "/",
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    message: message ? message : "Successfully 🥳",
    token,
    data: {
      user,
    },
  });
};
