import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

//! Routes

//! import Routes
// import healthCheckRouter from "./routes/healthCheck.routes.js";

app.get("/", (req, res) => {
  res.send("Hello World");
});

//! All Routes
// app.use("/api/v1/health-check", healthCheckRouter);

export { app };
