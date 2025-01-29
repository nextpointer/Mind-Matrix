import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request from: ${req.headers.origin}`);
  console.log('Request Headers:', req.headers);
  next();
});

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json({ limit: "256kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import UserRouter from "./routes/user.routes.js";
import QuestionRouter from "./routes/question.routes.js";
import CounsellorRouter from "./routes/counsellor.routes.js";
import ResultRouter from "./routes/result.routes.js";
import AiRouter from "./routes/ai.routes.js";
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/questions", QuestionRouter);
app.use("/api/v1/counsellors", CounsellorRouter);
app.use("/api/v1/result", ResultRouter);
app.use("/api/v1/", AiRouter);

export { app };
