import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"; // 🛠️ Import auth routes
import { AppError } from "./utils/appError.js"; // 🚨 Custom AppError class
import { globalErrorHandler } from "./controllers/error.controller.js"; // 🛑 Global error handler
import cookieParser from "cookie-parser"; // 🍪 Parse cookies
import rateLimit from "express-rate-limit"; // 🚫 Rate limit middleware
import helmet from "helmet"; // 🔒 Security HTTP headers
import mongoSanitize from "express-mongo-sanitize"; // 🔒 Sanitize NoSQL data
import xss from "xss-clean"; // 🔒 Sanitize XSS
import hpp from "hpp"; // 🔒 Prevent HTTP Parameter Pollution

const app = express(); // 🚀 Initialize Express app

//! Global Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL, // 🌐 Allow requests from CLIENT_URL
    methods: ["GET", "POST", "PUT", "DELETE"], // 🔧 Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // 🧰 Allowed headers
    credentials: true, // 🎫 Allow credentials (cookies, headers, etc.)
  })
);

app.use(helmet()); // 🛡️ Set security headers

//! Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // ⏳ 1 hour
  max: 500, // 📊 Limit each IP to 500 requests
  message: "Too many requests from this IP, please try again after an hour", // ⚠️ Rate limit message
});
app.use("/api", limiter); // 🚫 Apply rate limiter to /api

app.use(express.json({ limit: "10kb" })); // 📝 Parse JSON requests
app.use(cookieParser()); // 🍪 Parse cookies
app.use(mongoSanitize()); // 🔒 Sanitize NoSQL data
app.use(xss()); // 🔒 Sanitize XSS
app.use(hpp({ whitelist: [] })); // 🔒 Prevent HTTP Parameter Pollution

//! Serve static files
app.use(express.static(`${__dirname}/public`)); // 📂 Serve static files

//! Error Logging Middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // 🐞 Log error stack
  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong 😞", // ⚠️ Error message
  });
});

//! Routes
app.use("/api/v1/auth", authRoutes); // 🔒 Auth routes

//! 404 Handler
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404)); // ❌ Handle undefined routes
});

//! Global Error Handler
app.use(globalErrorHandler); // 🛑 Use global error handler

export { app }; // 📤 Export the app




// CORS 🌐: Enables Cross-Origin Resource Sharing.
// Helmet 🛡️: Secures HTTP headers.
// Rate Limiter 🚫: Limits requests to prevent abuse.
// Cookie Parser 🍪: Parses cookies from requests.
// MongoSanitize 🔒: Sanitizes input to prevent NoSQL injection.
// XSS Clean 🔒: Cleans input to prevent XSS attacks.
// HPP 🔒: Protects against HTTP Parameter Pollution.
// Global Error Handler 🛑: Catches and handles errors throughout the app.
