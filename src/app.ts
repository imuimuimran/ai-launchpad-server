import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";

import router from "./routes";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

const app = express();

app.use(helmet());

app.use(cors());

app.use(compression());

app.use(hpp());

app.use(mongoSanitize());

// app.use(
//   "/api/v1/webhooks/clerk",
//   express.raw({ type: "application/json" })
// );

// app.use(express.json());


app.use(
  "/api/v1/webhooks/clerk",
  express.raw({ type: "application/json" })
);

app.use((req, res, next) => {
  if (req.originalUrl === "/api/v1/webhooks/clerk") {
    next();
  } else {
    express.json()(req, res, next);
  }
});



app.use(
  "/api/v1",
  router
);

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "AI LaunchPad API is running",
  });
});

app.use(globalErrorHandler);

export default app;