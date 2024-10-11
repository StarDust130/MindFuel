import jwt from "jsonwebtoken";

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// Middleware to protect routes
export const protectRoute = (req, res, next) => {
  // Get token from Authorization header
  const token =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null;

  // Check if token is present
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next(); // Continue to the next middleware/route handler
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token is not valid",
    });
  }
};
