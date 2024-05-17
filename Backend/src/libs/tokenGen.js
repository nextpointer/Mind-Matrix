import { user } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const presentUser = await user.findById(userId);
    const AccessToken = await presentUser.generateAccessToken();
    // console.log(AccessToken);
    const RefreshToken = await presentUser.generateRefreshToken();
    // console.log(RefreshToken);
    presentUser.RefreshToken = RefreshToken;
    await presentUser.save({ validateBeforeSave: false });
    return { AccessToken, RefreshToken };
  } catch (error) {
    throw new ApiError(
        500,
      "Something went wrong when generating the access and refresh token "
    )
  }
};

export default generateAccessAndRefreshToken;