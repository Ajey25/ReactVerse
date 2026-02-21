import User from "../models/User.js";
import UserProgress from "../models/UserProgress.js";
import UserAptiProgress from "../models/UserAptiProgress.js";
import InterviewProgress from "../models/InterviewProgress.js";
import CodingProgress from "../models/CodingProgress.js";

export async function calculateTotalXP(userId) {
  /* ---------------- LESSON XP ---------------- */
  const completedLessons = await UserProgress.countDocuments({ userId });
  const lessonXP = completedLessons * 10;

  /* ---------------- APTITUDE XP ---------------- */
  const aptiProgress = await UserAptiProgress.find({ userId });
  let aptitudeXP = 0;
  for (const p of aptiProgress) {
    aptitudeXP += Number(p.bestXP || 0);
  }

  /* ---------------- INTERVIEW XP ---------------- */
  const interviewCount = await InterviewProgress.countDocuments({ userId });
  const interviewXP = interviewCount * 10;

  /* ---------------- CODING XP ---------------- */
  const codingXpMap = { 1: 20, 2: 30, 3: 50 };
  const codingProgress = await CodingProgress.find({ userId });

  let codingXP = 0;
  for (const entry of codingProgress) {
    const qId = Number(entry.questionId);
    if (codingXpMap[qId]) {
      codingXP += codingXpMap[qId];
    }
  }

  /* ---------------- TOTAL XP ---------------- */
  const totalXP = lessonXP + aptitudeXP + interviewXP + codingXP;

  /* 🔥 SYNC BOTH FIELDS */
  await User.findByIdAndUpdate(userId, {
    xp: totalXP,
    totalXP: totalXP,
  });

  return totalXP;
}
