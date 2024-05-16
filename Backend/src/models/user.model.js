import mongoos, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "video",
      },
    ],
    password: {
      type: String,
      required: [true, "password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10, (e) => {
    console.log(e);
  });
  next();
});

userSchema.methods.IsPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function (){
  jwt.sign(
    {
      _id:this.id,
      email:this.email,
      username:this.username,
      fullname:this.fullname
    },
    process.env.ACCESSTOKENSECRET,
    {
      expiresIn:process.env.ACCESSTOKENEXPIRY
    }
  )
}
userSchema.methods.generateRefreshToken = async function (){
  jwt.sign(
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

