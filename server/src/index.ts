import { app } from "./app";
import mongoose from "mongoose";
import morgan from "morgan";
import { readdirSync } from "fs";

const start = async () => {
  if (!process.env.DB_URI) {
    throw new Error("DB_URI must be defined");
  }

  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }

  const port = process.env.PORT || 8080;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

start();
