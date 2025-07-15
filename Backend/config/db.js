import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("MONGO_URL", process.env.MONGO_URL);
    const con = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1); 
  }
};
