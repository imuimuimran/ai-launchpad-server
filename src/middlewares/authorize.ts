import {
  NextFunction,
  Request,
  Response,
} from "express";

import { UserRole } from "../modules/users/user.interface";

export const authorize =
  (...roles: UserRole[]) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.currentUser) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (
      !roles.includes(req.currentUser.role)
    ) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${roles.join(", ")}`,
      });
    }

    next();
  };