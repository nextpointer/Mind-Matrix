import { ApiError } from "../utils/APiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { user } from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

export const verifyToken = asyncHandler(async (req, _, next) => {
  try {
    // retrieve the accessToken from the cookie
    const token =
      req.cookies?.AccessToken ||
      req.header("Authorization")?.replace("Bearer ", "").trim();


    // throw error if token is not available
    if (!token) {
      throw new ApiError(401, "Unauthorized Access - No Token Provided");
    }

    // decode the token
    const decodedToken = await jwt.verify(token, process.env.ACCESSTOKENSECRET);

    // finding the user
    const presentUser = await user
      .findById(decodedToken?._id)
      .select("-password -RefreshToken");

    if (!presentUser) {
      throw new ApiError(401, "Invalid Access Token - User Not Found");
    }

    req.User = presentUser;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    throw new ApiError(401, "Invalid Access Token");
  }
});
