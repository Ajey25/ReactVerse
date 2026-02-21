// controllers/progressController.js
import UserProgress from "../models/UserProgress.js";
import User from "../models/User.js";
import Lesson from "../models/Lesson.js";
import InterviewProgress from "../models/InterviewProgress.js";
import InterviewQuestion from "../models/InterviewQuestion.js";
import UserAptiProgress from "../models/UserAptiProgress.js";
import CodingProgress from "../models/CodingProgress.js";
import AptitudeQuestion from "../models/AptitudeQuestion.js";
import { calculateTotalXP } from "./calculateTotalXP.js";

export const markLessonComplete = async (req, res) => {
  try {
    const { userId, moduleId, lessonId } = req.body;

    if (!userId || !moduleId || !lessonId) {
      return res.status(400).json({
        success: false,
        message: "userId, moduleId, and lessonId are required",
      });
    }

    // Already completed? → Skip duplicate
    const exists = await UserProgress.findOne({ userId, lessonId });
    if (exists) {
      const currentXP = (await UserProgress.countDocuments({ userId })) * 10;
      return res.json({
        success: true,
        message: "Already completed",
        xp: currentXP,
      });
    }

    // Create progress record
    await UserProgress.create({
      userId,
      moduleId,
      lessonId,
      xp: 10,
    });

    // 🔥 SYNC XP IMMEDIATELY - Updates both xp and totalXP
    const totalXP = await calculateTotalXP(userId);

    res.json({
      success: true,
      message: "Lesson marked complete",
      xp: totalXP,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserCompletedLessons = async (req, res) => {
  try {
    const userId = req.params.userId;

    const progress = await UserProgress.find({ userId });

    res.json({
      success: true,
      completedLessons: progress.map((p) => p.lessonId.toString()),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// controllers/userStatsController.js

export const getUserStats = async (req, res) => {
  try {
    const userId = req.params.userId;

    // ======================================================
    // 1. LESSON PROGRESS
    // ======================================================
    const completedLessonsDocs = await UserProgress.find({ userId }).sort({
      completedAt: -1,
    });

    const completedLessons = completedLessonsDocs.length;
    const totalLessons = await Lesson.countDocuments();

    const lessonXP = completedLessons * 10;
    const totalLessonXP = totalLessons * 10;

    const lessonPercent =
      totalLessonXP > 0 ? Math.round((lessonXP / totalLessonXP) * 100) : 0;

    // ======================================================
    // 2. APTITUDE PROGRESS (LEVEL WISE)
    // ======================================================

    // 🔥 SYSTEM TOTALS
    const aptitudeQuestions = await AptitudeQuestion.find({ isActive: true });

    let aptitudeTotalByLevel = { 1: 0, 2: 0, 3: 0 };

    for (let q of aptitudeQuestions) {
      aptitudeTotalByLevel[q.level] += q.xp;
    }

    let totalAptitudeXP =
      aptitudeTotalByLevel[1] +
      aptitudeTotalByLevel[2] +
      aptitudeTotalByLevel[3];

    // 🔥 USER PROGRESS
    const aptiProgress = await UserAptiProgress.find({ userId });

    let aptitudeXP = 0;

    let aptitudeLevels = {
      1: { xp: 0, total: aptitudeTotalByLevel[1] },
      2: { xp: 0, total: aptitudeTotalByLevel[2] },
      3: { xp: 0, total: aptitudeTotalByLevel[3] },
    };

    for (let p of aptiProgress) {
      aptitudeXP += p.bestXP;
      aptitudeLevels[p.level].xp = p.bestXP;
    }

    const aptitudePercent =
      totalAptitudeXP > 0
        ? Math.round((aptitudeXP / totalAptitudeXP) * 100)
        : 0;

    // ======================================================
    // 3. INTERVIEW PROGRESS (LEVEL WISE)
    // ======================================================

    let interviewLevels = {
      1: { completedPages: 0, totalPages: 0, xp: 0, totalXP: 0 },
      2: { completedPages: 0, totalPages: 0, xp: 0, totalXP: 0 },
      3: { completedPages: 0, totalPages: 0, xp: 0, totalXP: 0 },
    };

    const interviewQuestions = await InterviewQuestion.find({ isActive: true });

    let levelQuestionCount = { 1: 0, 2: 0, 3: 0 };

    for (let q of interviewQuestions) {
      levelQuestionCount[q.level]++;
    }

    for (let lvl = 1; lvl <= 3; lvl++) {
      interviewLevels[lvl].totalPages = Math.ceil(levelQuestionCount[lvl] / 10);
      interviewLevels[lvl].totalXP = interviewLevels[lvl].totalPages * 10;
    }

    const userInterview = await InterviewProgress.find({ userId });

    for (let p of userInterview) {
      interviewLevels[p.levelNo].completedPages++;
    }

    for (let lvl = 1; lvl <= 3; lvl++) {
      interviewLevels[lvl].xp = interviewLevels[lvl].completedPages * 10;
    }

    const interviewXP =
      interviewLevels[1].xp + interviewLevels[2].xp + interviewLevels[3].xp;

    const totalInterviewXP =
      interviewLevels[1].totalXP +
      interviewLevels[2].totalXP +
      interviewLevels[3].totalXP;

    const interviewPercent =
      totalInterviewXP > 0
        ? Math.round((interviewXP / totalInterviewXP) * 100)
        : 0;

    // ======================================================
    // 4. CODING PROGRESS (3 QUESTIONS FIXED)
    // ======================================================

    const codingXpMap = { 1: 20, 2: 30, 3: 50 };
    let totalCodingXP = codingXpMap[1] + codingXpMap[2] + codingXpMap[3]; // 100

    let codingLevels = {
      1: { xp: 0 },
      2: { xp: 0 },
      3: { xp: 0 },
    };

    // Fetch user coding submissions
    const codingProgress = await CodingProgress.find({ userId });

    // Fill XP earned
    let codingXP = 0;

    for (let entry of codingProgress) {
      const qId = Number(entry.questionId);

      if (codingLevels[qId]) {
        codingLevels[qId].xp = codingXpMap[qId]; // reward full xp
        codingXP += codingXpMap[qId];
      }
    }

    // percent
    const codingPercent =
      totalCodingXP > 0 ? Math.round((codingXP / totalCodingXP) * 100) : 0;

    // ======================================================
    // 5. GLOBAL XP (include coding XP now)
    // ======================================================
    const currentXP = lessonXP + interviewXP + aptitudeXP + codingXP;
    const totalXP =
      totalLessonXP + totalInterviewXP + totalAptitudeXP + totalCodingXP;

    const overallPercent =
      totalXP > 0 ? Math.round((currentXP / totalXP) * 100) : 0;

    // ======================================================
    // 6. STREAK SYSTEM
    // ======================================================
    let streakDays = 0;
    let longestStreak = 0;

    if (completedLessonsDocs.length > 0) {
      let streak = 1;

      for (let i = 1; i < completedLessonsDocs.length; i++) {
        const prev = new Date(completedLessonsDocs[i - 1].completedAt);
        const curr = new Date(completedLessonsDocs[i].completedAt);

        const diff =
          (prev.setHours(0, 0, 0, 0) - curr.setHours(0, 0, 0, 0)) /
          (1000 * 60 * 60 * 24);

        if (diff === 1) streak++;
        else if (diff > 1) {
          longestStreak = Math.max(longestStreak, streak);
          streak = 1;
        }
      }

      longestStreak = Math.max(longestStreak, streak);

      const last = new Date(completedLessonsDocs[0].completedAt);
      const today = new Date();

      const diffFromToday =
        (today.setHours(0, 0, 0, 0) - last.setHours(0, 0, 0, 0)) /
        (1000 * 60 * 60 * 24);

      if (diffFromToday <= 1) streakDays = longestStreak;
    }

    // ======================================================
    // RESPONSE
    // ======================================================

    res.json({
      success: true,

      // LESSON
      completedLessons,
      totalLessons,
      lessonXP,
      totalLessonXP,
      lessonPercent,

      // APTITUDE
      aptitudeXP,
      totalAptitudeXP,
      aptitudePercent,
      aptitudeLevels,

      // INTERVIEW
      interviewXP,
      totalInterviewXP,
      interviewPercent,
      interviewLevels,

      // CODING
      codingXP,
      totalCodingXP,
      codingPercent,
      codingLevels,

      // GLOBAL
      currentXP,
      totalXP,
      overallPercent,

      // STREAK
      streakDays,
      longestStreak,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
