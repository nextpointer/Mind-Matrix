import express from "express";
import { getQuestionsByCategory, addTestQuestions } from "../controllers/question.controller.js";

const router = express.Router();

// Route to get questions by category
router.route('/test/:category').get(getQuestionsByCategory);

// Route to add new test questions
router.route('/test').post(addTestQuestions);

export default router;