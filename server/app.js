import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"; // 🛠️ Import auth routes
import { AppError } from "./utils/appError.js"; // 🚨 Import custom AppError class
import { globalErrorHandler } from "./controllers/error.controller.js"; // 🛑 Import global error handler
import cookieParser from "cookie-parser"; // 🍪 Parse incoming cookies
import rateLimit from "express-rate-limit"; // 🚫 Limit requests
import helmet from "helmet"; // 🔒 Secure HTTP headers

const app = express(); // 🚀 Initialize Express app

//! Global Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL, // 🌐 Allow requests from CLIENT_URL
    methods: ["GET", "POST", "PUT", "DELETE"], // 🔧 Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // 🧰 Allowed headers
    credentials: true, // 🎫 Allow credentials (cookies, authorization headers, etc.)
  })
);

app.use(helmet()); // 🛡️ Set security HTTP headers

//? Rate Limiting Middleware (Prevent Brute Force Attacks)
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // ⏳ 1 hour window
  max: 500, // 📊 limit each IP to 500 requests per hour
  message: "Too many requests from this IP, please try again after an hour", // ⚠️ Error message for rate limit
});

app.use("/api", limiter); // 🚫 Apply rate limiter to all requests to /api

app.use(express.json({ limit: "10kb" })); // 📝 Parse incoming JSON requests, limit size to 10KB
app.use(cookieParser()); // 🍪 Parse cookies from incoming requests

// Server static files
app.use(express.static(`${__dirname}/public`));

//! Error Logging Middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // 🐞 Log the error stack for debugging
  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong 😞", // ⚠️ Send error message
  });
});

//! Routes

//! Auth Routes
app.use("/api/v1/auth", authRoutes); // 🔒 Authentication routes

//! 404 Page not found
// 🚨 Catch all undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404)); // ❌ Pass 404 error to global error handler
});

//! Error Handler Middleware
app.use(globalErrorHandler); // 🛑 Use the global error handler

export { app }; // 📤 Export the app
