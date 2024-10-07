import "dotenv/config";
import { app } from "./app.js";
import { PORT } from "./constant.js";
import connectDB from "./db/connectDB.js";

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT} 🚀`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed 💥: ", error);
    process.exit(1);
  });
