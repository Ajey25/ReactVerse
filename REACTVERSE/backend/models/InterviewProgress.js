import mongoose from "mongoose";

const interviewProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  cardId: { type: String, required: true }, // top50, aptitude, coding
  levelNo: { type: Number, required: true },
  pageNo: { type: Number, required: true },

  xp: { type: Number, default: 10 }, // fixed XP per page

  completedAt: { type: Date, default: Date.now },
});

// Prevent duplicate XP for the same page
interviewProgressSchema.index(
  { userId: 1, cardId: 1, levelNo: 1, pageNo: 1 },
  { unique: true }
);

export default mongoose.model("InterviewProgress", interviewProgressSchema);
