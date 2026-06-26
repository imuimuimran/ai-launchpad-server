import { Schema, model } from "mongoose";

const userSchema = new Schema(
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

    image: String,

    role: {
      type: String,
      enum: [
        "user",
        "manager",
        "admin",
      ],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const User =
  model("User", userSchema);