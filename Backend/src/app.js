import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true // allow session cookie from browser to pass through
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
app.use("/api/v1/user",UserRouter)
app.use("/api/v1/questions", QuestionRouter);
app.use("/api/v1/counsellors", CounsellorRouter);
app.use("/api/v1/result", ResultRouter);


export { app };
