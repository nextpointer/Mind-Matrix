import mongoos, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    FirstName: {
      type: String,
      // required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    Password: {
      type: String,
      required: true
    },
    Age: {
      type: Number,
      required: true,
      min: 0
    },
    Gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Other'],
      trim: true
    },
    IsStudent: {
      type: Boolean,
      required: true
    },
    IsSubscribed: {
      type: Boolean,
      required: true
    },
    IsCounsellor: {
      type: Boolean,
      required: true
    },
    RefreshToken: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next();
  try {
    this.Password = await bcrypt.hash(this.Password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.IsPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.Password);
};

userSchema.methods.generateAccessToken = async function (){
  return jwt.sign(
    {
      _id:this.id,
      Email:this.Email,
      FirstName:this.FirstName
    },
    process.env.ACCESSTOKENSECRET,
    {
      expiresIn:process.env.ACCESSTOKENEXPIRY
    }
  )
}
userSchema.methods.generateRefreshToken = async function (){
  return jwt.sign(
    {
      _id:this.id
    },
    process.env.REFRESHTOKENSECRET,
    {
      expiresIn:process.env.REFRESHTOKENEXPIRY
    }
  )
}
export const user = mongoos.model("User", userSchema);

