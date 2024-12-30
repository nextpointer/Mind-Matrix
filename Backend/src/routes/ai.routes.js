import express from "express";
import { getTheprompt } from "../controllers/ai.controller.js";
const router = express.Router();

router.route("/ai").post(getTheprompt);

export default router;