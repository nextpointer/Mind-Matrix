import { asyncHandler } from "../utils/asyncHandler.mjs";
import { ApiError } from "../utils/ApiError.mjs";
import { ApiResponse } from "../utils/ApiResponse.mjs";
import { user } from "../models/user.model.js";
import generateAccessAndRefreshToken from "../libs/tokenGen.js";

export const registerUser = asyncHandler(async (req, res) => {
  //   distructuring the req data
  const {
    FirstName,
    LastName,
    Email,
    Password,
    Age,
    Gender,
    IsStudent,
    IsSubscribed,
    IsCounsellor,
  } = req.body;

  //   validate empty or not
  if (
    !FirstName ||
    !LastName ||
    !Email ||
    !Password ||
    Age === undefined ||
    !Gender ||
    IsStudent === undefined ||
    IsSubscribed === undefined ||
    IsCounsellor === undefined
  ) {
    throw new ApiError(400, "All fields are required!");
  }

  //   check the user already exist or not
  const userExistance = await user.findOne({ Email });
  if (userExistance) {
    throw new ApiError(400, "User already exist");
  }

  const Usery = await user.create({
    FirstName,
    LastName,
    Email,
    Password,
    Age,
    Gender,
    IsStudent,
    IsSubscribed,
    IsCounsellor,
  });

  const createdUser = await user
    .findById(Usery._id)
    .select("-Password -refreshToken");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong when registering the user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User Register Successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  // get the data from request
  const { Email, Password } = req.body;
  // check validation
  if (!Email) {
    throw new ApiError(404, "Email is required for login");
  }
  // finding the user by email
  const presentUser = await user.findOne({ Email });
  // checking the password
  const passwordChecking = await presentUser.IsPasswordCorrect(Password);
  if (!passwordChecking) {
    throw new ApiError(401, "Invalid User Credential");
  }

  // generating access Token and Refresh Token
  const { RefreshToken, AccessToken } = await generateAccessAndRefreshToken(
    presentUser._id
  );

  // filter and get the user
  const loggedInUser = await user
    .findById(presentUser._id)
    .select("-Password -RefreshToken");

  // configure the cookie option
  const option = {
    secure: true,
    sameSite: "strict",
    path: '/'
  };

  // return the response
  return res
    .status(200)
    .cookie("AccessToken", AccessToken, option)
    .cookie("RefreshToken", RefreshToken, option)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          AccessToken,
          RefreshToken,
        },
        "User LoggedIn Successfully"
      )
    );
  
});

export const LogOutUser = asyncHandler(async (req, res) => {
  
  await user.findByIdAndUpdate(
    req.User._id,
    {
      $unset: {
        RefreshToken: "",
      },
    },
    {
      new: true,
    }
  );
  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("AccessToken", option)
    .clearCookie("RefreshToken", option)
    .json(new ApiResponse(200, {}, "User Logout Successfully"));
});

export const getUserInfo = asyncHandler(async (req, res) => {
  const userId = req.User._id;
  const userInfo = await user.findById(userId).select('-Password -RefreshToken');
  if (!userInfo) {
    throw new ApiError(404, "User not found");
  }
  res.status(200).json({ user: userInfo });
});
