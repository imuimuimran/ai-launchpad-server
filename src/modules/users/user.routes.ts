import { Router } from "express";

import { clerkWebhook, getUserByClerkId, getCurrentUser,} from "./user.controller";

import { auth } from "../../middlewares/auth";
import { authorize } from "../../middlewares/authorize";

const router = Router();

router.post(
  "/clerk",
  clerkWebhook
);

router.get(
  "/me",
  auth,
  getCurrentUser
);

router.get(
  "/user-only",
  auth,
  authorize("user"),
  (req, res) => {
    res.json({
      success: true,
      message: "User Route",
    });
  }
);

router.get(
  "/manager-only",
  auth,
  authorize("manager"),
  (req, res) => {
    res.json({
      success: true,
      message: "Manager Route",
    });
  }
);

router.get(
  "/admin-only",
  auth,
  authorize("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Admin Route",
    });
  }
);


router.get(
  "/test-auth",
  auth,
  (req, res) => {
    res.json({
      success: true,
      user: req.currentUser,
    });
  }
);

router.get(
  "/:clerkId",
  getUserByClerkId
);

export default router;