import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message:
      "AI LaunchPad Server Running",
  });
});

export default router;