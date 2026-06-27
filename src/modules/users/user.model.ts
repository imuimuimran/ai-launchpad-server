import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "manager", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>(
  "User",
  userSchema
);