import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected Successfully 😊: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error to Connect DB 😞: ", error.message);
    process.exit(1);
  }
};

export default connectDB;
