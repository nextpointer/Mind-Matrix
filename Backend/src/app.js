import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionsSuccessStatus: 200,
    maxAge: 3600,
  })
);

app.use(express.json({ limit: "256kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


import UserRouter from "./routes/user.routes.js";
import QuestionRouter from "./routes/question.routes.js";
import CounsellorRouter from "./routes/counsellor.routes.js"
import ResultRouter from "./routes/result.routes.js"
import AiRouter from "./routes/ai.routes.js"
app.use("/api/v1/user",UserRouter)
app.use("/api/v1/questions", QuestionRouter);
app.use("/api/v1/counsellors", CounsellorRouter);
app.use("/api/v1/result", ResultRouter);
app.use("/api/v1/",AiRouter );


export { app };
 