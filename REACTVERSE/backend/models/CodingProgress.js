import mongoose from "mongoose";

const CodingProgressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    questionId: { type: String, required: true },
    xp: { type: Number, required: true },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("CodingProgress", CodingProgressSchema);
