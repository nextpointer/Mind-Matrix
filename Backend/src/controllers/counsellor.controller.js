import { asyncHandler } from "../utils/asyncHandler.mjs";
import { ApiError } from "../utils/ApiError.mjs";
import { ApiResponse } from "../utils/ApiResponse.mjs";
import { Counselor } from "../models/counsellor.model.js";

// Get counselor by ID
export const getCounselorById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const counselor = await Counselor.findById(id);
  if (!counselor) {
    throw new ApiError(404, "Counselor not found");
  }

  return res.status(200).json(new ApiResponse(200, counselor, "Counselor fetched successfully"));
});

// fetch all counsellor
export const getCounselors = asyncHandler(async (req, res) => {
    const counselors = await Counselor.find();
    if (!counselors || counselors.length === 0) {
      throw new ApiError(404, "No counselors found");
    }
  
    return res.status(200).json(new ApiResponse(200, counselors, "Counselors fetched successfully"));
  });

// Add new counselor
export const addCounselor = asyncHandler(async (req, res) => {
  const { 
    CounsellorName, 
    SpecializedBio, 
    ShortBio, 
    Qualification, 
    FullBio, 
    PhoneNumber, 
    Email, 
    Glance, 
    Address, 
    Specialized, 
    Rating 
  } = req.body;

  if (!CounsellorName || !SpecializedBio || !ShortBio || !Qualification || !FullBio || !PhoneNumber || !Email || !Glance || !Address || !Specialized || Rating === undefined) {
    throw new ApiError(400, "All fields are required");
  }

  const newCounselor = await Counselor.create({
    CounsellorName, 
    SpecializedBio, 
    ShortBio, 
    Qualification, 
    FullBio, 
    PhoneNumber, 
    Email, 
    Glance, 
    Address, 
    Specialized, 
    Rating 
  });

  return res.status(201).json(new ApiResponse(201, newCounselor, "Counselor added successfully"));
});
