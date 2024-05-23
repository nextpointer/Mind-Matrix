import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
    questionName: {
      type: String,
      required: true,
    },
  });

  const questionsSchema = new Schema({
    TestCategory: {
      type: String,
      required: true,
    },
    About: {
      type: String,
      required: true,
    },
    Questions: [questionSchema],
  },
  {
    timestamps: true,
  }
);

  export const Questions = mongoose.model('Question', questionsSchema);