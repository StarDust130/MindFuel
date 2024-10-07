import express from "express";
import cors from "cors";
import "dotenv/config";
import { PORT } from "./constant.js";

const app = express();

app.use(cors("http://localhost:3000"));

// app.use(json());

app.get("/", (req, res) => {
  res.send("Hello World From BABY BABU 🙃 😆");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
