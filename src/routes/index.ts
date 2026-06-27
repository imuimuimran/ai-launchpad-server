import { Router } from "express";

import healthRoute from "./health.route";

import userRoutes from "../modules/users/user.routes";

const router = Router();

router.use(
  "/health",
  healthRoute
);

router.use(
  "/webhooks",
  userRoutes
);

export default router;