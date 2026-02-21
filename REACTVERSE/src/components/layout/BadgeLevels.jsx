import { GiDiamondHard, GiLaurelsTrophy, GiMetalDisc } from "react-icons/gi";
import { FaMedal, FaCircle } from "react-icons/fa6";

// Reversed order: Bronze is level 1, Diamond is level 5
export const badgeLevels = [
  {
    level: 1,
    rank: "Beginner",
    percent: 0,
    label: "Bronze",
    color: "#ea580c",
    gradient: "linear-gradient(135deg, #fb923c 0%, #ea580c 100%)",
    icon: <FaMedal className="text-white" />,
    description: "Beginner mastery",
  },
  {
    level: 2,
    rank: "Intermediate",
    percent: 25,
    label: "Silver",
    color: "#94a3b8",
    gradient: "linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)",
    icon: <GiMetalDisc className="text-white" />,
    description: "Solid performer",
  },
  {
    level: 3,
    rank: "Advanced",
    percent: 50,
    label: "Gold",
    color: "#eab308",
    gradient: "linear-gradient(135deg, #facc15 0%, #eab308 100%)",
    icon: <GiLaurelsTrophy className="text-white" />,
    description: "Skilled achiever",
  },
  {
    level: 4,
    rank: "Expert",
    percent: 75,
    label: "Platinum",
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)",
    icon: <FaCircle className="text-white" />,
    description: "Advanced expertise",
  },
  {
    level: 5,
    rank: "Master",
    percent: 100,
    label: "Diamond",
    color: "#38bdf8",
    gradient: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)",
    icon: <GiDiamondHard className="text-white" />,
    description: "Master of all challenges",
  },
];

export function getBadge(xp, totalXP) {
  if (!xp || !totalXP || totalXP <= 0) {
    return badgeLevels[0]; // Return Bronze as default
  }
  const percent = (xp / totalXP) * 100;

  // Find the highest badge where user's percent >= badge percent
  // Start from highest to lowest
  for (let i = badgeLevels.length - 1; i >= 0; i--) {
    if (percent >= badgeLevels[i].percent) {
      return badgeLevels[i];
    }
  }
  return badgeLevels[0]; // Fallback to Bronze
}

export function getNextBadge(xp, totalXP) {
  if (!xp || !totalXP || totalXP <= 0) {
    return badgeLevels[1]; // Return Silver as next
  }
  const percent = (xp / totalXP) * 100;
  const currentBadge = getBadge(xp, totalXP);

  // Find the next badge (higher level)
  const nextBadgeIndex = badgeLevels.findIndex(
    (b) => b.level === currentBadge.level + 1
  );

  if (nextBadgeIndex >= 0 && nextBadgeIndex < badgeLevels.length) {
    return badgeLevels[nextBadgeIndex];
  }
  return null; // No next badge (already at Diamond)
}
