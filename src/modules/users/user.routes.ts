import { Router } from "express";

import { clerkWebhook, getUserByClerkId, } from "./user.controller";

const router = Router();

router.post(
  "/clerk",
  clerkWebhook
);

router.get(
  "/:clerkId",
  getUserByClerkId
);

export default router;