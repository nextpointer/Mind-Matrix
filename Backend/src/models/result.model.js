import mongoose, { Schema } from "mongoose";

const ResultSchema = new mongoose.Schema({
    CatagoryType: {
      type: String,
      required: true
    },
    Low: {
      type: [String], // Array of strings
      required: true
    },
    Moderate: {
      type: [String], // Array of strings
      required: true
    },
    High: {
      type: [String], // Array of strings
      required: true
    },
    Severe: {
      type: [String], // Array of strings
      required: true
    }
  });
  
  export const Result = mongoose.model('Result', ResultSchema);

  