import express, { json } from "express"; 
import cors from "cors";

const app = express();

app.use(cors());

app.use(json());



app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
