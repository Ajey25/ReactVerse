// models/AptitudeQuestion.js
import mongoose from "mongoose";

const AptitudeQuestionSchema = new mongoose.Schema(
  {
    level: {
      type: Number,
      required: true, // 1 | 2 | 3
      enum: [1, 2, 3],
    },

    pageNo: {
      type: Number,
      required: true, // 1–5
    },

    questionType: {
      type: String,
      required: true,
      enum: ["mcq", "logic", "debug"], // 3 types
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

    // Only for MCQ
    options: {
      type: [String],
      default: [],
    },

    correctOption: {
      type: String,
      required: function () {
        return this.questionType === "mcq";
      },
    },

    // For logic/debug: direct answer explanation
    correctAnswer: {
      type: String,
      required: function () {
        return this.questionType !== "mcq";
      },
    },

    explanation: {
      type: String,
      default: "",
    },

    xp: {
      type: Number,
      required: true, // mcq=2, logic=2, debug=3
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

// Unique index to prevent duplicates
AptitudeQuestionSchema.index(
  { level: 1, pageNo: 1, questionNo: 1 },
  { unique: true }
);

export default mongoose.model("AptitudeQuestion", AptitudeQuestionSchema);
