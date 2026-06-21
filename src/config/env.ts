import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,

  MONGODB_URI:
    process.env.MONGODB_URI,

  CLIENT_URL:
    process.env.CLIENT_URL,

  CLERK_SECRET_KEY:
    process.env.CLERK_SECRET_KEY,

  OPENAI_API_KEY:
    process.env.OPENAI_API_KEY,
};