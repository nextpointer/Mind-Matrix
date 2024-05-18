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

import router from "./routes/user.routes.js";
app.use("/api/v1/user",router)

export { app };
