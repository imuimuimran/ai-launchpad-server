import { Router } from "express";

import { clerkWebhook } from "./user.controller";

const router = Router();

router.post(
  "/clerk",
  clerkWebhook
);

export default router;