import mongoose from "mongoose";

const UserAptiProgressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    level: { type: Number, required: true },

    bestScore: {
      type: Number,
      default: 0,
    },

    bestXP: {
      type: Number,
      default: 0,
    },

    currentXP: {
      type: Number,
      default: 0, // XP in the latest attempt
    },

    totalXP: {
      type: Number,
      default: 0, // total possible XP (sum of level questions)
    },

    attempts: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

UserAptiProgressSchema.index({ userId: 1, level: 1 }, { unique: true });

export default mongoose.model("UserAptiProgress", UserAptiProgressSchema);
