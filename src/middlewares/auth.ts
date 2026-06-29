import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const auth = (
  req: AuthenticatedRequest,
//   req: Request,
  res: Response,
  next: NextFunction
) => {

  console.log("Authorization Header Received:", req.headers.authorization);
  const { userId } = getAuth(req);

  console.log("Clerk Decoded User ID:", userId);

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  req.userId = userId;

  next();
};