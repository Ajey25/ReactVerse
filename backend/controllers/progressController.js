// controllers/progressController.js
import UserProgress from "../models/UserProgress.js";
import User from "../models/User.js";
import Lesson from "../models/Lesson.js";
import InterviewProgress from "../models/InterviewProgress.js";
import InterviewQuestion from "../models/InterviewQuestion.js";
import UserAptiProgress from "../models/UserAptiProgress.js";

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

    // XP = every lesson * 10
    const completed = await UserProgress.countDocuments({ userId });
    const totalXP = completed * 10;

    // Update User model
    await User.findByIdAndUpdate(userId, { xp: totalXP });

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
    const aptiProgress = await UserAptiProgress.find({ userId }).sort({
      level: 1,
    });

    let aptitudeXP = 0;
    let totalAptitudeXP = 0;

    let aptitudeLevels = {
      1: { xp: 0, total: 0 },
      2: { xp: 0, total: 0 },
      3: { xp: 0, total: 0 },
    };

    for (let p of aptiProgress) {
      aptitudeXP += p.bestXP;
      totalAptitudeXP += p.totalXP;

      aptitudeLevels[p.level] = {
        xp: p.bestXP,
        total: p.totalXP,
      };
    }

    const aptitudePercent =
      totalAptitudeXP > 0
        ? Math.round((aptitudeXP / totalAptitudeXP) * 100)
        : 0;

    // ======================================================
    // 3. INTERVIEW PROGRESS (LEVEL WISE) - CLEAN & CORRECT
    // ======================================================

    let interviewLevels = {
      1: { completedPages: 0, totalPages: 0, xp: 0, totalXP: 0 },
      2: { completedPages: 0, totalPages: 0, xp: 0, totalXP: 0 },
      3: { completedPages: 0, totalPages: 0, xp: 0, totalXP: 0 },
    };

    // 1. Count total QUESTIONS per level
    const interviewQuestions = await InterviewQuestion.find({ isActive: true });

    let levelQuestionCount = { 1: 0, 2: 0, 3: 0 };

    for (let q of interviewQuestions) {
      levelQuestionCount[q.level]++; // <-- FIXED (correct field!)
    }

    // 2. Convert questions → pages (10 per page)
    for (let lvl = 1; lvl <= 3; lvl++) {
      interviewLevels[lvl].totalPages = Math.ceil(levelQuestionCount[lvl] / 10);
      interviewLevels[lvl].totalXP = interviewLevels[lvl].totalPages * 10;
    }

    // 3. Fetch user progress
    const userInterview = await InterviewProgress.find({ userId });

    // Each record already = 1 page
    for (let p of userInterview) {
      interviewLevels[p.levelNo].completedPages++;
    }

    // 4. Calculate XP earned per level
    for (let lvl = 1; lvl <= 3; lvl++) {
      interviewLevels[lvl].xp = interviewLevels[lvl].completedPages * 10;
    }

    // 5. Global interview XP
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
    // 4. GLOBAL XP
    // ======================================================
    const currentXP = lessonXP + interviewXP + aptitudeXP;
    const totalXP = totalLessonXP + totalInterviewXP + totalAptitudeXP;

    const overallPercent =
      totalXP > 0 ? Math.round((currentXP / totalXP) * 100) : 0;

    // ======================================================
    // 5. STREAK SYSTEM
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
    // 6. RESPONSE
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
