import mongoose from "mongoose";
const DB_NAME = "mindfuel";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(`MongoDB Connected Successfully 😊: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error to Connect DB 😞: ", error.message);
    process.exit(1);
  }
};

export default connectDB;


//! Unhandled Rejection Error
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
  console.log("Unhandled Rejection Error. Shutting Down... 💣😞: ", err.message);
  
}
);

