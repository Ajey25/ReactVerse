// models/InterviewQuestion.js
import mongoose from "mongoose";

const InterviewQuestionSchema = new mongoose.Schema(
  {
    level: {
      type: Number,
      required: true, // 1, 2, 3
      enum: [1, 2, 3],
    },
    questionNo: {
      type: Number,
      required: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("InterviewQuestion", InterviewQuestionSchema);
