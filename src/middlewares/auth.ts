import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { UserService } from "../modules/users/user.service";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const auth = async (
  req: AuthenticatedRequest,
//   req: Request,
  res: Response,
  next: NextFunction
) => {

  console.log("Authorization Header Received:", req.headers.authorization);
  
  try {
  const { userId } = getAuth(req);

  console.log("Clerk Decoded User ID:", userId);

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const user =
      await UserService.getUserByClerkId(
        userId
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

  req.userId = userId;

  req.currentUser = user;

  next();
  } catch (error) {
    next(error);
  }
};