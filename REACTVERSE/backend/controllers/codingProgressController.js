import CodingProgress from "../models/CodingProgress.js";
import { calculateTotalXP } from "./calculateTotalXP.js";

export const addCodingProgress = async (req, res) => {
  try {
    const { userId, questionId, xp } = req.body;

    if (!userId || !questionId || !xp) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Check if already submitted
    const existing = await CodingProgress.findOne({ userId, questionId });

    if (existing) {
      return res.status(400).json({ message: "Already submitted" });
    }

    const newEntry = await CodingProgress.create({
      userId,
      questionId,
      xp,
      submittedAt: new Date(),
    });

    // 🔥 SYNC XP IMMEDIATELY - Updates both xp and totalXP
    await calculateTotalXP(userId);

    return res.status(201).json({
      message: "Progress saved",
      data: newEntry,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
