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
  });

  const Question = mongoose.model('Question', questionsSchema);