import InterviewProgress from "../models/InterviewProgress.js";
import { calculateTotalXP } from "./calculateTotalXP.js";

export const markPageCompleted = async (req, res) => {
  try {
    const { userId, cardId, levelNo, pageNo } = req.body;

    if (!userId || !cardId || !levelNo || !pageNo) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Try inserting new record
    try {
      const progress = await InterviewProgress.create({
        userId,
        cardId,
        levelNo,
        pageNo,
      });

      // 🔥 SYNC XP IMMEDIATELY - Updates both xp and totalXP
      await calculateTotalXP(userId);

      return res.status(201).json({
        success: true,
        message: "XP awarded",
        xpGiven: progress.xp,
        progress,
      });
    } catch (err) {
      // Duplicate => XP already taken
      if (err.code === 11000) {
        return res.status(200).json({
          success: true,
          message: "Page already completed. No XP awarded.",
          xpGiven: 0,
        });
      }

      throw err;
    }
  } catch (error) {
    console.error("Error in markPageCompleted:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// get total XP
// get total XP correctly with totalPages
export const getUserInterviewXP = async (req, res) => {
  try {
    const { userId, levelNo } = req.params;

    // HOW many pages exist in this level (real count)
    const totalPages =
      (await InterviewQuestion.countDocuments({
        level: levelNo,
        isActive: true,
      })) / 10; // because 10 Q per page

    const progress = await InterviewProgress.find({ userId, levelNo });

    const totalXP = progress.length * 10;

    return res.json({
      success: true,
      totalXP,
      completedPages: progress.length,
      totalPages: Math.ceil(totalPages), // <-- YOU WERE MISSING THIS
      progress,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch XP",
    });
  }
};
