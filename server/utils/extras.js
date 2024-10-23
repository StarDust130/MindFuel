import jwt from "jsonwebtoken";

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"; 
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "90d"; 

console.log("JWT_EXPIRES_IN 🐽", JWT_EXPIRES_IN);


//! Sign JWT Token with user ID
export const signToken = (id, expiresIn) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn, // Pass the expiration as a parameter
  });
};

//! Send JWT Token in cookie and success response
export const createSendToken = async (user, message, statusCode, res) => {
  const accessToken = signToken(user._id, JWT_EXPIRES_IN);
  const refreshToken = signToken(user._id, JWT_REFRESH_EXPIRES_IN); // Longer expiration for refresh token

  res.cookie("accessToken", accessToken, {
    httpOnly: false, // More secure by preventing client-side JS access
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days for access token
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // Keep this httpOnly
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days for refresh token
  });

  // Store the refresh token in the user document for future verification
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false }); // Make sure to await this

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    message: message || "Successfully 🥳",
    accessToken,
    data: {
      user,
    },
  });
};
