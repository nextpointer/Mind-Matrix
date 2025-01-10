import { asyncHandler } from "../utils/asyncHandler.mjs";
import { ApiError } from "../utils/ApiError.mjs";
import { ApiResponse } from "../utils/ApiResponse.mjs";
import { Result } from "../models/result.model.js";


export const getResults = asyncHandler(async (req, res) => {

  // Extract and sum the points from req.body
  const pointsObject = JSON.parse(req.body.theAns);
  const points = Object.values(pointsObject).reduce((total, num) => total + Number(num), 0);
  const { catagory } = req.params;

  if (points < 0 || points > 100) {
    throw new ApiError(400, "Points must be a number between 0 and 100");
  }

  let level;
if (points >= 20 && points <= 39) {
    level = 'Low';
  } else if (points >= 40 && points <= 59) {
    level = 'Moderate';
  } else if (points >= 60 && points <= 79) {
    level = 'High';
  } else if (points >= 80 && points <= 100) {
    level = 'Severe';
  } else {
    throw new ApiError(400, "Points do not fall into any level category");
  }

  const ResultData = await Result.findOne({ CatagoryType: catagory });
  if (!ResultData) {
    throw new ApiError(404, "Category not found");
  }

  const responseLevelData = ResultData[level];
  if (!responseLevelData) {
    throw new ApiError(404, "Level data not found in the specified category");
  }

  return res.status(200).json(new ApiResponse(200, { points, level, responseLevelData }, "Results fetched successfully"));
});



  export const addResult = asyncHandler(async (req, res) => {
    const { CatagoryType, Low, Moderate, High, Severe } = req.body;
  
    if (!CatagoryType || !Low || !Moderate || !High || !Severe) {
      throw new ApiError(400, "All fields are required");
    }
  
    const ResultData = await Result.create({
      CatagoryType,
      Low,
      Moderate,
      High,
      Severe
    });
  
    return res.status(201).json(new ApiResponse(201, ResultData, "Result added successfully"));
  });