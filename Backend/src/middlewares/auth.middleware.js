import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { user } from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

export const verifyToken = asyncHandler(async (req, _, next) => {
  // retrieve the accessToken from the cookie
  try {
    const token =
      req.cookies?.AccessToken ||
      req.Header("Authorization")?.replace("Bearer", "");

    // throw error if token is not available
    if (!token) {
      throw new ApiError(401, "Unauthorized Access");
    }
    //   if token available then decode it
    const decodedToken = await jwt.decode(token, process.env.ACCESSTOKENSECRET);
    //   finding the user
    const presentUser = await user
      .findById(decodedToken?._id)
      .select("-password -RefreshToken");
    if (!presentUser) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.User = presentUser;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid Access Token");
  }
});
