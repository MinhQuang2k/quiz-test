import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/test-online");
    console.log("MongoDB connected!");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();
