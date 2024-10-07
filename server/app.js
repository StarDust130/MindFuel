import express from "express";
import cors from "cors";

const app = express();

//! Common Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong 😞",
  });
});

//! Routes

//! import Routes
// import healthCheckRouter from "./routes/healthCheck.routes.js";

app.get("/", (req, res) => {
  res.send("Hello World");
});

//! All Routes
// app.use("/api/v1/health-check", healthCheckRouter);

export { app };
