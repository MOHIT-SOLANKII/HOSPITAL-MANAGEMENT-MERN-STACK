import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log("DATABASE connected successfully !!!");
  } catch (error) {
    console.error("Error connecting to DATABASE : ", error);
  }
};
