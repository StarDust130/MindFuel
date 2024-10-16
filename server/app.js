import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"; // 🛠️ Import auth routes
import { AppError } from "./utils/appError.js"; // 🛠️ Import custom AppError class
import { globalErrorHandler } from "./controllers/error.controller.js"; // 🛠️ Import global error handler
import cookieParser from "cookie-parser"; // 🍪 Parse incoming cookies

const app = express();

//! Common Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL, // 🌐 Allow requests from CLIENT_URL
    methods: ["GET", "POST", "PUT", "DELETE"], // 🔧 Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // 🔧 Allowed headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.use(express.json()); // 📝 Parse incoming JSON requests
app.use(cookieParser()); // 🍪 Parse incoming cookies

//! Error Logging Middleware
app.use((err, req, res, next) => {
  console.log(err.stack); // 🐛 Log the error stack for debugging
  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong 😞", // 💬 Send error message
  });
});

//! Routes

//! Auth Routes
app.use("/api/v1/auth", authRoutes); // 🔒 All authentication routes

//! 404 Page not found
// 💥 Catch all undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404)); // 🚨 Pass 404 error to global error handler
});

//! Error Handler Middleware
app.use(globalErrorHandler); // 🛑 Use the global error handler

export { app }; // 📦 Export the app
