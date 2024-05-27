import express from "express";
import { getResults, addResult } from "../controllers/result.controller.js";


const router = express.Router();
// Route to get questions by category
router.route('/:catagory').post(getResults);

// Route to add new test questions
router.route('/').post(addResult);

export default router;