// controllers/aptiController.js
import AptitudeQuestion from "../models/AptitudeQuestion.js";
import UserAptiProgress from "../models/UserAptiProgress.js";
import { calculateTotalXP } from "./calculateTotalXP.js";

export const submitAptiTest = async (req, res) => {
  try {
    const { userId, level, answers } = req.body;

    // fetch all level questions
    const questions = await AptitudeQuestion.find({
      level,
      isActive: true,
    }).sort({ questionNo: 1 });

    let correct = 0;
    let wrong = 0;
    let earnedXP = 0;

    // total XP possible in that level
    const totalXP = questions.reduce((sum, q) => sum + q.xp, 0);

    let detailed = [];

    for (let q of questions) {
      const userAnswer = answers.find((a) => a.questionNo === q.questionNo);
      const selected = userAnswer?.selected || null;

      let isCorrect = false;

      if (q.questionType === "mcq") {
        isCorrect = selected === q.correctOption;
      } else {
        isCorrect =
          String(selected).trim().toLowerCase() ===
          String(q.correctAnswer).trim().toLowerCase();
      }

      if (isCorrect) {
        correct++;
        earnedXP += q.xp;
      } else {
        wrong++;
      }

      detailed.push({
        questionNo: q.questionNo,
        question: q.question,
        selected,
        correct: q.questionType === "mcq" ? q.correctOption : q.correctAnswer,
        isCorrect,
        xp: q.xp,
        explanation: q.explanation,
      });
    }

    // get or create user progress
    let progress = await UserAptiProgress.findOne({ userId, level });

    if (!progress) {
      progress = new UserAptiProgress({
        userId,
        level,
        bestScore: correct,
        bestXP: earnedXP,
        currentXP: earnedXP,
        totalXP: totalXP, // store total possible XP
        attempts: 1,
      });
      await progress.save();
    } else {
      progress.attempts += 1;

      // update current attempt XP
      progress.currentXP = earnedXP;

      // best score?
      if (correct > progress.bestScore) {
        progress.bestScore = correct;
      }

      // best XP?
      if (earnedXP > progress.bestXP) {
        progress.bestXP = earnedXP;
      }

      // always keep max possible XP updated (in case new questions added)
      progress.totalXP = totalXP;

      await progress.save();
    }

    // 🔥 SYNC XP IMMEDIATELY - Updates both xp and totalXP
    await calculateTotalXP(userId);

    res.status(200).json({
      success: true,
      summary: {
        correct,
        wrong,
        total: questions.length,
        earnedXP,
        maxXP: totalXP,
        bestScore: progress.bestScore,
        bestXP: progress.bestXP,
        currentXP: progress.currentXP,
        attempts: progress.attempts,
      },
      detailed,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
