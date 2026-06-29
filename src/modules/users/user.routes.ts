import { Router } from "express";

import { clerkWebhook, getUserByClerkId, getCurrentUser,} from "./user.controller";

import { auth } from "../../middlewares/auth";

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
  "/:clerkId",
  getUserByClerkId
);

export default router;