import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Questions } from "../models/question.model.js";

// Get questions by category
export const getQuestionsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  const questions = await Questions.findOne({ TestCategory: category });
  if (!questions) {
    throw new ApiError(404, "Test category not found");
  }

  return res.status(200).json(new ApiResponse(200, questions, "Questions fetched successfully"));
});

// Add new test questions
export const addTestQuestions = asyncHandler(async (req, res) => {
  const { TestCategory, About, Questions } = req.body;

  if (!TestCategory || !About || !Questions || !Array.isArray(Questions)) {
    throw new ApiError(400, "All fields are required");
  }

  const newTest = await Questions.create({
    TestCategory,
    About,
    Questions,
  });

  return res.status(201).json(new ApiResponse(201, newTest, "Test questions added successfully"));
});
