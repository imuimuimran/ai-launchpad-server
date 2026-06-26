import mongoose from "mongoose";
import { env } from "./env";

export const connectDB =
  async () => {
    await mongoose.connect(
      env.MONGODB_URI as string
    );

    console.log(
      "MongoDB Connected"
    );
  };